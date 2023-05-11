import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('bookstore') // will act as the root for all the endpoints we define here.
// So, the endpoint for the getAllBooks() method will be /bookstore
export class AppController {

  // the constructor injects the service into our controller class
  constructor(@Inject('BOOKS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllBooks() {
    // By using send method from the client property sends a message to the microservice,
    // and it will wait until the microservice successfully completes the operation and
    // sends back a response before returning.
    return this.client.send({cmd: 'get_books'}, {})
  }

  @Get(':id')
  getBookByID(@Param('id') id ) {
    return this.client.send({cmd: 'get_book'}, id)
  }

  @Post()
  createNewBook(@Body() book: BookDTO) {
    return this.client.send({cmd: 'new_book'}, book)
  }
}