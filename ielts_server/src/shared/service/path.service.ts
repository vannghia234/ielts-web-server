import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { join } from "path";

@Injectable()
export class PathService {
    constructor(@Inject(REQUEST) private req: Request) {}

    initFullPath(srcPath: string) {
        const protocol = this.req.protocol
		const hostOrigin = this.req.headers.host
        return protocol + '://' + join(hostOrigin, srcPath).replace(/[\/|\\]/g, '/')
    }
}