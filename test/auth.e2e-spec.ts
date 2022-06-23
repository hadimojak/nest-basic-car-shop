import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'had2i@mmm.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: email, password: 'asdqr34234' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  //   it('handles a signup request', () => {
  //     const email = 'hadi@mmm.com';
  //     return request(app.getHttpServer())
  //       .post('/auth/signup')
  //       .send({ email: email, password: 'asdqr34234' })
  //       .expect(201)
  //       .then((res) => {
  //         const { id, email } = res.body;
  //         expect(id).toBeDefined();
  //         expect(email).toEqual(email);
  //       });
  //   });

  it('signup as a new user and get currectly logged in user', async () => {
    const email = 'asd@asd.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'awre2' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);

  });
});
