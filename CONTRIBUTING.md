# CONTRIBUTING

## Commit & PR Style

Commit & PR messages should be styled following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Example

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Check out more examples [here](https://www.conventionalcommits.org/en/v1.0.0/#examples).

### Variations

In order to be easier to scan through commit & PR messages the first letter of the title should be uppercased.

```
# NO
feat: allow provided config object to extend other configs

# YES
feat: Allow provided config object to extend other configs
```

### Types

- feat
- fix
- docs
- style
- refactor
- perf
- test
- build
- ci
- chore
- revert
