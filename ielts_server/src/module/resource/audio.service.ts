import { Injectable } from "@nestjs/common";
import { ResourceService } from "./resource.service";

@Injectable()
export class AudioUploadService extends ResourceService {
    protected srcFolder: string = '/audio';

}