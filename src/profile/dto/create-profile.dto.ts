export class CreateProfileDto {
    email: string;
    password: string;
    role: string;
    location: string;
    phoneNo: string;
    status: string;
    uploads: number;
    isApproved: boolean;
}