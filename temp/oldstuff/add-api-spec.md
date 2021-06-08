---
title: Adding a OAS file to your documentation.
---

# Adding a swagger file to your project.

To add a OAS file to your documentation its a few steps to set it up and after that its updated automatically.

## 1. Put your swagger in the `specs` directory, or link to it from a public available URL

## 2. Define it `siteConfig.yaml`

```yaml
oasDefinitions:
  petstore: ./openapi/petstore.yaml
```

3. Add a .page.yaml for it in the specs folder.

```yaml
type: redoc
definitionId: petstore
showInfo: true
expand: true
```

To read learn more about OAS and the page file you can go into [Learn developer portal](/developer-portal/index) to learn more about this.
