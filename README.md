# backend-challenge-developer-ADDIKA

_Este proeycto contempla el desarrollo del challenge ._

## Comenzando π

_Estas instrucciones te permitirΓ‘n obtener una copia del proyecto en funcionamiento en tu mΓ‘quina local para propΓ³sitos de desarrollo y pruebas._

**Estructura de proyecto**

```
βββ docker-compose.development.yml
βββ jwtExamples
|  βββ user.txt
βββ nest-cli.json
βββ out.txt
βββ package-lock.json
βββ package.json
βββ README.md
βββ src
|  βββ app.module.ts
|  βββ app.service.ts
|  βββ main.ts
|  βββ modules
|  |  βββ comments
|  |  |  βββ application
|  |  |  |  βββ commands
|  |  |  |  |  βββ create-comment.command.ts
|  |  |  |  |  βββ create-comment.handler.spec.ts
|  |  |  |  |  βββ create-comment.handler.ts
|  |  |  |  |  βββ delete-comment.command.ts
|  |  |  |  |  βββ delete-comment.handler.spec.ts
|  |  |  |  |  βββ delete-comment.handler.ts
|  |  |  |  βββ events
|  |  |  |  |  βββ integration.ts
|  |  |  |  βββ queries
|  |  |  |     βββ comment.query.ts
|  |  |  |     βββ find-comments-by-post-id.handler.spec.ts
|  |  |  |     βββ find-comments-by-post-id.handler.ts
|  |  |  |     βββ find-comments-by-post-id.query.ts
|  |  |  |     βββ find-comments-by-post-id.result.ts
|  |  |  βββ comments.module.ts
|  |  |  βββ domain
|  |  |  |  βββ comment.ts
|  |  |  |  βββ error.ts
|  |  |  |  βββ factory.ts
|  |  |  |  βββ repository.ts
|  |  |  βββ infrastructure
|  |  |  |  βββ entities
|  |  |  |  |  βββ base.entity.ts
|  |  |  |  |  βββ comment.entity.ts
|  |  |  |  βββ message
|  |  |  |  |  βββ integration-event.publisher.ts
|  |  |  |  βββ queries
|  |  |  |  |  βββ comment.query.ts
|  |  |  |  βββ repositories
|  |  |  |     βββ comment.repository.ts
|  |  |  βββ interface
|  |  |     βββ comments.controller.ts
|  |  |     βββ dto
|  |  |     |  βββ create-comment.body.dto.ts
|  |  |     |  βββ delete-comment.param.dto.ts
|  |  |     |  βββ find-comments-by-post-id.param.dto.ts
|  |  |     βββ response-description.ts
|  |  βββ posts
|  |     βββ application
|  |     |  βββ commands
|  |     |  |  βββ create-post.command.ts
|  |     |  |  βββ create-post.handler.spec.ts
|  |     |  |  βββ create-post.handler.ts
|  |     |  |  βββ delete-post.command.ts
|  |     |  |  βββ delete-post.handler.spec.ts
|  |     |  |  βββ delete-post.handler.ts
|  |     |  |  βββ update-post.command.ts
|  |     |  |  βββ update-post.handler.spec.ts
|  |     |  |  βββ update-post.handler.ts
|  |     |  βββ events
|  |     |  |  βββ integration.ts
|  |     |  βββ queries
|  |     |     βββ find-post-by-id.handler.spec.ts
|  |     |     βββ find-post-by-id.handler.ts
|  |     |     βββ find-post-by-id.query.ts
|  |     |     βββ find-post-by-id.result.ts
|  |     |     βββ find-posts.handler.spec.ts
|  |     |     βββ find-posts.handler.ts
|  |     |     βββ find-posts.query.ts
|  |     |     βββ find-posts.result.ts
|  |     |     βββ post.query.ts
|  |     βββ domain
|  |     |  βββ error.ts
|  |     |  βββ events
|  |     |  |  βββ update-post.event.ts
|  |     |  βββ factory.ts
|  |     |  βββ post.ts
|  |     |  βββ repository.ts
|  |     βββ infrastructure
|  |     |  βββ entities
|  |     |  |  βββ base.entity.ts
|  |     |  |  βββ post.entity.ts
|  |     |  βββ message
|  |     |  |  βββ integration-event.publisher.ts
|  |     |  βββ queries
|  |     |  |  βββ post.query.ts
|  |     |  βββ repositories
|  |     |     βββ post.repository.ts
|  |     βββ interface
|  |     |  βββ dto
|  |     |  |  βββ create-post.body.dto.ts
|  |     |  |  βββ delete-post.param.ts
|  |     |  |  βββ find-post-by-id.param.dto.ts
|  |     |  |  βββ find-post-by-id.response.dto.ts
|  |     |  |  βββ find-posts.query.dto.ts
|  |     |  |  βββ find-posts.response.dto.ts
|  |     |  |  βββ update-post.body.dto.ts
|  |     |  |  βββ update-post.param.dto.ts
|  |     |  βββ posts.controller.ts
|  |     |  βββ response-description.ts
|  |     βββ posts.module.ts
|  βββ shared
|     βββ application
|     |  βββ application.module.ts
|     |  βββ auth
|     |  |  βββ auth.module.ts
|     |  |  βββ authz
|     |  |     βββ authz.module.ts
|     |  |     βββ jwt.strategy.ts
|     |  βββ decorators
|     |  |  βββ permissions.decorator.ts
|     |  |  βββ public.decorator.ts
|     |  βββ guards
|     |  |  βββ guards.module.ts
|     |  |  βββ jwt-auth.guard.ts
|     |  |  βββ permisisions.guard.ts
|     |  βββ logger
|     |     βββ logger.module.ts
|     |     βββ myLogger.service.ts
|     βββ shared.module.ts
βββ test
|  βββ app.e2e-spec.ts
|  βββ jest-e2e.json
βββ tsconfig.build.json
βββ tsconfig.json
```

**Tecnologias, Librerias, Etc. Utilizadas**
* NestJS
* Jest
* Auth0
* Swagger Server
* DDD
* Guards (Middlewares)
* Mysql
* rabbitmq

## Requerimientos π¦

* docker-compose
* docker
* npm

### InstalaciΓ³n π§

```
npm install
```

## EjecuciΓ³n β¨οΈ

Estas son las instrucciones para poder levantar el proyecto correctamente, ya que este cuenta con validaciones, por ejemplo: conexion disponible a la base de datos

```
docker-compose -f docker-compose.development.yml up -d

Esperar que levante correctamente el mysql y el rabbitmq, cuando termine, te devolvera automaticamente la terminal

npm run start:dev
```

Una vez terminado de levantar el proyecto estara disponible el [Servicio De Swagger](http://localhost:3000/api).

### Token de prueba (Usuario) πΌ

Este token debe ir en los header de Authorization o puede ejecutar directamente del servicio de [Servicio De Swagger](http://localhost:3000/api) y agregando dicho token.

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdxUk5ubktDUFdvanM1TEpLeHBRUCJ9.eyJpc3MiOiJodHRwczovL2VkaGluZS1sdGRhLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJZdHZwYldoNGZYaFJ1b042NDhUUjFmVzBVV2l2amZlNUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90ZW1wbGF0ZS1uZXN0anMtYXBpLXByaXZhdGUtYXV0aDAvYXBpIiwiaWF0IjoxNjM1MDA2Njk4LCJleHAiOjE2MzUwOTMwOTgsImF6cCI6Ill0dnBiV2g0ZlhoUnVvTjY0OFRSMWZXMFVXaXZqZmU1Iiwic2NvcGUiOiJjb21tZW50OmRlbGV0ZSBjb21tZW50c0J5UG9zdElkOnNlbGVjdCBwb3N0OmNyZWF0ZSBwb3N0OnVwZGF0ZSBwb3N0OmRlbGV0ZSBwb3N0QnlJZDpzZWxlY3QiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6WyJjb21tZW50OmRlbGV0ZSIsImNvbW1lbnRzQnlQb3N0SWQ6c2VsZWN0IiwicG9zdDpjcmVhdGUiLCJwb3N0OnVwZGF0ZSIsInBvc3Q6ZGVsZXRlIiwicG9zdEJ5SWQ6c2VsZWN0Il19.KCx87awXKlPgcphbdybjj39SUoTkH_sIrEp3w94hFgip704Lls1uKRyzN4iI-6MUHBZfazuHhWApfk9wQlRv0UooRtideSY64DSPT9A9gjV6HkyKAdgAgza1CPj6vK8zI1BxEv66DeJNd1WG_dsVNnaox1rpgVM-0bK9FPn0poE8HJyvdyDlRMzGm462BejkwvOk3C17-uJZnVp73STVFW_fOcRu_r6AMP2P8rvRZ7EeeOIxnTuOKaG6WMGOFCdyfbDhwdrLgqwnlRw96-QwdFaNP_fF2PRkeBBx09dqO4iwOfpVh9K24TaNui8fC2ApdDU-fzf8QvEOBFv8ARiwUg
```

Este token contempla los siguientes permisos:

```
"comment:delete",
"commentsByPostId:select",
"post:create",
"post:update",
"post:delete",
"postById:select"
```

### Test's π

```
 npm run test
 npm run test:cov
```

## Autor βοΈ

* **Sergio AndrΓ©s Orellana Roa** - **Edhine** - *Desarrollador full-stack* - [Linkedin](https://www.linkedin.com/in/sergio-andres-orellana-roa/) - [Github](https://github.com/Edhine)


## RetroalimentaciΓ³n

Todo comentario y correcciones, no dudes en mencionarlas π’, me ayudas a mejorar este proyecto β€.

---
β¨οΈ con β€οΈ por [Edhine](https://github.com/Edhine) π
