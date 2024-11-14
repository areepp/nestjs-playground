import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';
import { FileStorageService } from 'src/shared/file-upload/file-storage.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async findAll() {
    return this.usersRepository.getAll();
  }

  async findUserById(id: number) {
    const response = await this.usersRepository.getOneWithId(id);
    if (!response) throw new NotFoundException();
    return response;
  }

  async findUserByEmail(email: string) {
    const response = await this.usersRepository.getOneWithEmail(email);
    if (!response) throw new NotFoundException();
    return response;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      await this.usersRepository.create({
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
      });
      const { password, ...rest } = createUserDto;
      return { ...rest };
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Email already exists');
      }
      throw new Error();
    }
  }

  async update(
    id: number,
    payload: UpdateUserDto & { profilePictureFile?: Express.Multer.File },
  ) {
    try {
      let s3Url: string | null = null;
      if (payload.profilePictureFile) {
        s3Url = await this.fileStorageService.upload(
          payload.profilePictureFile.buffer,
          `profile-pictures/${id}.png`,
        );
      }
      await this.usersRepository.update(id, {
        name: payload.name,
        // added the v parameter so that next.js will serve the newest image instead of the cached image.
        ...(s3Url ? { fileUploadString: `${s3Url}?v=${Date.now()}` } : {}),
      });
      return payload;
    } catch (error) {
      console.error('error', error);
      throw new InternalServerErrorException('User update failed');
    }
  }
}
