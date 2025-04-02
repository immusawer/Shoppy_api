import * as sharp from 'sharp';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  // Compress and save image
  async compressImage(inputPath: string, outputPath: string): Promise<void> {
    // Get image metadata to check format
    const { format } = await sharp(inputPath).metadata();

    if (format === 'jpeg' || format === 'jpg') {
      // Compress JPEG images
      await sharp(inputPath)
        .resize(800) // Resize to max width of 800px
        .jpeg({ quality: 80 }) // Compress JPEG to 80% quality
        .toFile(outputPath); // Save to output path
    } else if (format === 'png') {
      // Compress PNG images
      await sharp(inputPath)
        .resize(800) // Resize to max width of 800px
        .png({ quality: 80, compressionLevel: 9 }) // Compress PNG (quality and compression)
        .toFile(outputPath); // Save to output path
    } else {
      // For unsupported formats, throw an error
      throw new Error('Unsupported image format');
    }
  }
}
