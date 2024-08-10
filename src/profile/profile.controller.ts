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
  UseGuards, 
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse } from 'express';
import { Request as ExpressRequest } from 'express';
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
  
  @Post('logout')
  @HttpCode(200) // Ensure the response code is 200 OK
  async logout(@Res({ passthrough: true }) response: ExpressResponse) {
    response.clearCookie('jwt');
    response.setHeader('Cache-Control', 'no-store');
    return { message: 'Logout successful' };
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
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    
    return this.profileService.remove(id);
  }
  
}
