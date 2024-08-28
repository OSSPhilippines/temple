import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomeProps() {
    return {
      title: 'Temple',
      description: 'Edit this file to change the content of the page.',
      start:  0,
      list: [
        'Edit this file',
        'Restyle this page',
        'Create your own component',
        'Star the Temple Repo',
        'Write a blog post about Temple',
        'Fork the respository',
        'Contribute to the project',
      ]
    }
  }
}
