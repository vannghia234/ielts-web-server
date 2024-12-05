import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'

@Injectable()
export class ResourceService {
    protected readonly uploadFolder: string = '/static'
    protected srcFolder: string = '/media'

    setSrcFolder(src: string) {
        this.srcFolder = src
    }

    getSourcePath(fileName: string): string {
        return path.join(this.srcFolder, fileName)
    }

    getRelativePath(srcPath: string): string{
        return path.join(this.uploadFolder, srcPath)
    }

    getFullPath(subPath: string): string {
        return path.join(process.cwd(), this.getRelativePath(subPath))
    }

    existFile(src: string) {
        return fs.existsSync(src)
    }

    makeFolder(uploadFolderPath: string) {
        if (!fs.existsSync(uploadFolderPath)) {
            fs.mkdirSync(uploadFolderPath);
        }
    }

    /**
     * Writes a file to the specified upload folder.
     *
     * @param uploadFolder - The path to the upload folder where the file will be written.
     * @param file - The Multer file object representing the file to be written.
     *
     * @returns A promise that resolves to the unique filename of the written file.
     *
     * @remarks
     * This function ensures the upload folder exists, constructs the file path by joining the upload folder and the original filename,
     * and writes the file buffer to the constructed path using the `fs.promises.writeFile` method.
     * Finally, it returns the unique filename of the written file.
     */
    async writeFile(uploadFolder: string, file: Express.Multer.File): Promise<string> {
        // ensure folder exists
        this.makeFolder(uploadFolder)

        // execute write file
        const uniqueFilename = `${file.originalname.replace(/ /g, '-')}`;
        const filePath = path.join(uploadFolder, uniqueFilename);
        await fs.promises.writeFile(filePath, file.buffer);

        return uniqueFilename
    }

    async deleteFile(src: string) {
        const filePath = this.getFullPath(src)

        if (this.existFile(filePath)) {
            await fs.promises.rm(filePath)
        }
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const uploadFolder = this.getFullPath(this.srcFolder);

        const uniqueFilename = await this.writeFile(uploadFolder, file)

        const fileName = this.getSourcePath(uniqueFilename)

        return fileName
    }
}
