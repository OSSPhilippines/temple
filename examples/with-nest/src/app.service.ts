import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTitle(): string {
    return 'Temple';
  }
  getDescription(): string {
    return 'Edit this file to change the content of the page.';
  }
  getStart(): number {
    return 0;
  }
  getList(): string[] {
    return [
      'Edit this file',
      'Restyle this page',
      'Create your own component',
      'Star the Temple Repo',
      'Write a blog post about Temple',
      'Fork the respository',
      'Contribute to the project',
    ];
  }
}
