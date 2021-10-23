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

## Requerimientos 📦

* docker-compose
* docker
* npm

### Instalación 🔧

```
npm install
```

## Producción ⌨️

Estas son las instrucciones para poder levantar el proyecto correctamente, ya que este cuenta con validaciones, por ejemplo: conexion disponible a la base de datos

```
"Esperar que levante correctamente el mysql y el rabbitmq, cuando termine, te devolvera automaticamente la terminal"
docker-compose -f .\docker-compose.development.yml up -d
npm run start:dev
```

## Autor ✒️

* **Sergio Andrés Orellana Roa** - **Edhine** - *Desarrollador full-stack* - [Linkedin](https://www.linkedin.com/in/sergio-andres-orellana-roa/) - [Github](https://github.com/Edhine)

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

## Retroalimentación

Todo comentario y correcciones, no dudes en mencionarlas 📢, me ayudas a mejorar este proyecto ❤.

---
⌨️ con ❤️ por [Edhine](https://github.com/Edhine) 😊
