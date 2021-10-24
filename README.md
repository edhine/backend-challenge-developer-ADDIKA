# backend-challenge-developer-ADDIKA

_Este proeycto contempla el desarrollo del challenge ._

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

**Estructura de proyecto**

```
├── docker-compose.development.yml
├── jwtExamples
|  └── user.txt
├── nest-cli.json
├── out.txt
├── package-lock.json
├── package.json
├── README.md
├── src
|  ├── app.module.ts
|  ├── app.service.ts
|  ├── main.ts
|  ├── modules
|  |  ├── comments
|  |  |  ├── application
|  |  |  |  ├── commands
|  |  |  |  |  ├── create-comment.command.ts
|  |  |  |  |  ├── create-comment.handler.spec.ts
|  |  |  |  |  ├── create-comment.handler.ts
|  |  |  |  |  ├── delete-comment.command.ts
|  |  |  |  |  ├── delete-comment.handler.spec.ts
|  |  |  |  |  └── delete-comment.handler.ts
|  |  |  |  ├── events
|  |  |  |  |  └── integration.ts
|  |  |  |  └── queries
|  |  |  |     ├── comment.query.ts
|  |  |  |     ├── find-comments-by-post-id.handler.spec.ts
|  |  |  |     ├── find-comments-by-post-id.handler.ts
|  |  |  |     ├── find-comments-by-post-id.query.ts
|  |  |  |     └── find-comments-by-post-id.result.ts
|  |  |  ├── comments.module.ts
|  |  |  ├── domain
|  |  |  |  ├── comment.ts
|  |  |  |  ├── error.ts
|  |  |  |  ├── factory.ts
|  |  |  |  └── repository.ts
|  |  |  ├── infrastructure
|  |  |  |  ├── entities
|  |  |  |  |  ├── base.entity.ts
|  |  |  |  |  └── comment.entity.ts
|  |  |  |  ├── message
|  |  |  |  |  └── integration-event.publisher.ts
|  |  |  |  ├── queries
|  |  |  |  |  └── comment.query.ts
|  |  |  |  └── repositories
|  |  |  |     └── comment.repository.ts
|  |  |  └── interface
|  |  |     ├── comments.controller.ts
|  |  |     ├── dto
|  |  |     |  ├── create-comment.body.dto.ts
|  |  |     |  ├── delete-comment.param.dto.ts
|  |  |     |  └── find-comments-by-post-id.param.dto.ts
|  |  |     └── response-description.ts
|  |  └── posts
|  |     ├── application
|  |     |  ├── commands
|  |     |  |  ├── create-post.command.ts
|  |     |  |  ├── create-post.handler.spec.ts
|  |     |  |  ├── create-post.handler.ts
|  |     |  |  ├── delete-post.command.ts
|  |     |  |  ├── delete-post.handler.spec.ts
|  |     |  |  ├── delete-post.handler.ts
|  |     |  |  ├── update-post.command.ts
|  |     |  |  ├── update-post.handler.spec.ts
|  |     |  |  └── update-post.handler.ts
|  |     |  ├── events
|  |     |  |  └── integration.ts
|  |     |  └── queries
|  |     |     ├── find-post-by-id.handler.spec.ts
|  |     |     ├── find-post-by-id.handler.ts
|  |     |     ├── find-post-by-id.query.ts
|  |     |     ├── find-post-by-id.result.ts
|  |     |     ├── find-posts.handler.spec.ts
|  |     |     ├── find-posts.handler.ts
|  |     |     ├── find-posts.query.ts
|  |     |     ├── find-posts.result.ts
|  |     |     └── post.query.ts
|  |     ├── domain
|  |     |  ├── error.ts
|  |     |  ├── events
|  |     |  |  └── update-post.event.ts
|  |     |  ├── factory.ts
|  |     |  ├── post.ts
|  |     |  └── repository.ts
|  |     ├── infrastructure
|  |     |  ├── entities
|  |     |  |  ├── base.entity.ts
|  |     |  |  └── post.entity.ts
|  |     |  ├── message
|  |     |  |  └── integration-event.publisher.ts
|  |     |  ├── queries
|  |     |  |  └── post.query.ts
|  |     |  └── repositories
|  |     |     └── post.repository.ts
|  |     ├── interface
|  |     |  ├── dto
|  |     |  |  ├── create-post.body.dto.ts
|  |     |  |  ├── delete-post.param.ts
|  |     |  |  ├── find-post-by-id.param.dto.ts
|  |     |  |  ├── find-post-by-id.response.dto.ts
|  |     |  |  ├── find-posts.query.dto.ts
|  |     |  |  ├── find-posts.response.dto.ts
|  |     |  |  ├── update-post.body.dto.ts
|  |     |  |  └── update-post.param.dto.ts
|  |     |  ├── posts.controller.ts
|  |     |  └── response-description.ts
|  |     └── posts.module.ts
|  └── shared
|     ├── application
|     |  ├── application.module.ts
|     |  ├── auth
|     |  |  ├── auth.module.ts
|     |  |  └── authz
|     |  |     ├── authz.module.ts
|     |  |     └── jwt.strategy.ts
|     |  ├── decorators
|     |  |  ├── permissions.decorator.ts
|     |  |  └── public.decorator.ts
|     |  ├── guards
|     |  |  ├── guards.module.ts
|     |  |  ├── jwt-auth.guard.ts
|     |  |  └── permisisions.guard.ts
|     |  └── logger
|     |     ├── logger.module.ts
|     |     └── myLogger.service.ts
|     └── shared.module.ts
├── test
|  ├── app.e2e-spec.ts
|  └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
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

## Requerimientos 📦

* docker-compose
* docker
* npm

### Instalación 🔧

```
npm install
```

## Ejecución ⌨️

Estas son las instrucciones para poder levantar el proyecto correctamente, ya que este cuenta con validaciones, por ejemplo: conexion disponible a la base de datos

```
docker-compose -f .\docker-compose.development.yml up -d

Esperar que levante correctamente el mysql y el rabbitmq, cuando termine, te devolvera automaticamente la terminal

npm run start:dev
```

Una vez terminado de levantar el proyecto estara disponible el [Servicio De Swagger](http://localhost:3000/api).

### Token de prueba (Usuario) 👼

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

### Test's 📌

```
 npm run test
 npm run test:cov
```

## Autor ✒️

* **Sergio Andrés Orellana Roa** - **Edhine** - *Desarrollador full-stack* - [Linkedin](https://www.linkedin.com/in/sergio-andres-orellana-roa/) - [Github](https://github.com/Edhine)


## Retroalimentación

Todo comentario y correcciones, no dudes en mencionarlas 📢, me ayudas a mejorar este proyecto ❤.

---
⌨️ con ❤️ por [Edhine](https://github.com/Edhine) 😊
