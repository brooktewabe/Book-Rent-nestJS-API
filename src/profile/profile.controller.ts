import { 
  BadRequestException, 
  Body, 
  ConflictException, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  Param, 
  Patch, 
  Post, 
  Req, 
  Res, 
  UnauthorizedException, 
  // UploadedFile, 
  UseGuards, 
  // UseInterceptors 
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse } from 'express';
import { Request as ExpressRequest } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
// import * as multer from 'multer';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private jwtService: JwtService
  ) {}

  @Post('signup')
  async register(
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const existingProfile = await this.profileService.findOneBy({ email: createProfileDto.email });
    if (existingProfile) {
      throw new ConflictException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(createProfileDto.password, 12);
  
    const profile = await this.profileService.create({
      ...createProfileDto,
      password: hashedPassword,
    });
  
    return profile;
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const profile = await this.profileService.findOneBy({ email });
    if (!profile || !await bcrypt.compare(password, profile.password)) {
      throw new BadRequestException('Invalid credentials');
    }


    const jwt = await this.jwtService.signAsync({ id: profile.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Success',
      profileId: profile.id,
      role: profile.role,
      status: profile.status,
      jwt: jwt,
    };
  }


    //Return cv
  @Get('pdf/:filename')
  @UseGuards(AuthGuard)
  getPdf(@Param('filename') filename: string, @Res() response: ExpressResponse) {
    const filePath = join(__dirname, `../uploads/${filename}`);
  
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', `inline; filename=${filename}`);
  
    createReadStream(filePath).pipe(response);
  }
  

  @Get('profile')
  @UseGuards(AuthGuard)
  async profile(@Req() request: ExpressRequest) {
    try {
      const cookie = request.cookies['jwt'];
      const { id } = await this.jwtService.verifyAsync(cookie);
  
      if (!id) {
        throw new UnauthorizedException();
      }
  
      const profile = await this.profileService.findOne(id);
      if (!profile) {
        throw new UnauthorizedException();
      }
  
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = profile;
  
      return { id: profile.id, ...result };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  
  @Post('logout')
  @HttpCode(200) // Ensure the response code is 200 OK
  async logout(@Res({ passthrough: true }) response: ExpressResponse) {
    response.clearCookie('jwt');
    response.setHeader('Cache-Control', 'no-store');
    return { message: 'Logout successful' };
  }
  
  
  // //Posting CV
  // @Post('upload')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file, @Body() createProfileDto: CreateProfileDto) {
  //   if (!file) {
  //     throw new BadRequestException('No file uploaded');
  //   }

  //   try {
  //     // Save the file to the wanted directory
  //     const filePath = './uploads/' + file.originalname;
  //     createWriteStream(filePath, file.buffer);

  //     const profileData = { ...createProfileDto, cv: file.originalname };
  //     const profile = await this.profileService.create(profileData);

  //     return profile;
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw new BadRequestException('Failed to upload file');
  //   }
  // }

  @Post('create')
  @UseGuards(AuthGuard)
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    const { password, ...rest } = createProfileDto;
    const hashedPassword = await bcrypt.hash(password, 12);
    const profile = await this.profileService.create({ ...rest, password: hashedPassword });

    return profile;
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }  
  
  //Forgot Password
  @Patch('email/:email')
  async change(
    @Param('email') email: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    if (updateProfileDto.password) {
      updateProfileDto.password = await bcrypt.hash(updateProfileDto.password, 12);
    }
    return this.profileService.change(email, updateProfileDto);
  }


  // @Patch(':id')
  // @UseGuards(AuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProfileDto: UpdateProfileDto,
  //   @UploadedFile() file: multer.File,
  // ) {
  //   if (updateProfileDto.password) {
  //     updateProfileDto.password = await bcrypt.hash(updateProfileDto.password, 12);
  //   }
  
  //   let profileData = { ...updateProfileDto };
  //   if (file) {
  //     // Save the file to the wanted directory
  //     const filePath = './uploads/' + file.originalname;
  //     createWriteStream(filePath, { flags: 'w' }).write(file.buffer);
  
  //     // Update the createProfileDto object with the file name
  //     profileData = { ...updateProfileDto, cv: file.originalname };
  //   }
  

  //   return this.profileService.update(id, profileData);
  // }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    
    return this.profileService.remove(id);
  }
  
}
