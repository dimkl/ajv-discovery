# Ajv Discovery API

`@dimkl/ajv-discovery-api` is a JSON Schema JS library for validating json schemas in server and exposing it as endpoint to be re-used in browser.

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) to install `@dimkl/ajv-discovery-api`

```bash
npm install @dimkl/ajv-discovery-api
```

## Requirements & limitations

- node >= 14

## Usage

Examples can be found in `examples/` folder:

- [Koa](./examples/koa)

## Testing

<!-- TODO: codecov -->

### Run tests

```
npm test
```

## Support
For feature request or issues contact me via [email](mailto:dimitris.klouvas@gmail.com) or open an issue in repo

## Publish

```
npm version {patch|minor|major}
npm publish
```

## Roadmap

- [ ] Add tests & code coverage
- [ ] Add .github/{ISSUE|PULL_REQUEST}
- [ ] Changelog & Github Releases
- [ ] Code coverage shield
- [ ] Add more examples (eg `fastify`, `express`, `nextJS`, `remix`, ...)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/MIT/)