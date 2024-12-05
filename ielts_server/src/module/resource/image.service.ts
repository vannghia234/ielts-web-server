import { Injectable } from "@nestjs/common";
import { ResourceService } from "./resource.service";

@Injectable()
export class ImageUploadService extends ResourceService {
    protected srcFolder: string = '/image';
}