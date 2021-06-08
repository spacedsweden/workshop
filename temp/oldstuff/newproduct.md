---
title: Setting up a new product category
---

# New product and first piece of content guide

### Knowledge that you need

Basic understanding how to work with branches, commits and sync in Github
Markdown knowledge (https://redoc.ly/docs)
OAS/Swagger knowledge
[Check list for building APIS](sinch.redoc.ly/docs/buildingapis)

### Prerequisites

1. access to this Github repo.

2. Access to Redocly, create an account with your Github username.

3. Git installed

4. An editor for markdown, I can recommend Visual Studio Code, or if you are on Mac Macdown is good as well.

## Adding a new product from scratch

You are going to learn how to use Github branches and redocly to publish private previews of documentation for internal communication and review.

### 1 Create a branch and clone

Clone to you computer (fancy word for copy )

\$\somewhereyouremember

```
git clone https://github.com/spacedsweden/redocly.git
```

The files where put in a sub directory called redocly switch in your terminal and lets create a branch

```
cd redocly
git checkout -b accountanddata
```

Name the branch to something relevant, i.e accountanddata, remember this name it will be part of your preview url https://preview.redoc.ly/sinch/{branchname}/.
Clone the repo to your local machine.

This makes creates and switched to this branch. Now we're ready to add content for your new API.

In the docs folder you will find all manual written docs, and you get a lot inspiration by looking at them. Today you are starting with a blank page.

[Learn more about basic markdown](https://redoc.ly/docs/developer-portal/markdown/)

Create a folder in the docs directory for your product, in this case we're working on `Account`
![](images/readme/folder_image.png)
In the Account directory create a new file and call it index.md

The first thing you need to do is to add a title to your document, this title is primarily used in navigation structures so keep it pretty short.

```
---
title: Building blocks to enable rich customer communication
---
```

After that you just typing your hart away on a getting started sequence for your key concepts. For now I will just add a few lines

```

# Accounts are are super cool

In order to use our API you need an Account, lrum impsum bla bla bla bla

```

Save your work, to make some navigation you need to edit to more files before we commit and sync (fancy word for saving and uploading to GitHub). This is a pit picky and i know it shoudl be easier, the good news is you only have to do it once per content, its worth the price so you can control order, trust me :D
[Read more](https://redoc.ly/docs/developer-portal/organizing-files/)

Open the file [siteConfig.yaml](siteConfig.yaml) find the section named nav. Around line 24 and looks similar to below.

```yaml
nav:
  - label: Conversation
    page: docs/conversation/index.md
  - label: Verification
    page: docs/verification/index.md
  - label: SMS
    page: docs/sms/index.md
  - label: Numbers
    page: docs/numbers/index.mdx
  - search: true
```

Before search add your path and what you would like to call the link.

```
nav:
  - label: Conversation
    page: docs/conversation/index.md
  - label: Verification
    page: docs/verification/index.md
  - label: SMS
    page: docs/sms/index.md
  - label: Numbers
    page: docs/numbers/index.mdx
  - label: Account
    page: docs/account/index.md
  - search: true
```

If you plan to work on many pages, wich I do recommend you will also control you sidebar menu. Lets prepare it before push it up to Github.

Open the file [/sidebars.yaml](sidebars.yaml) at teh end of the file add your own group, `account:`. If you plan to write a swagger file, add the API reference there for now as well. If you dont care about the order of your pages for just do docs/account/\*`

```yaml
accounts:
  - page: docs/account/index.md
```

Now can either start the local server or publish it to github. I recomend working on a local server if you are doing a lot of content authring.

```shell Push to Github
git add .
git commit -m"Added account product"
git push
```

Login to redocly, after a few minutes you should see your preview build finishing up. You can access you preview build with Basic auth user: sinch, pass: demo , at https://preview.redoc.ly/sinch/{branchname}/

```shell Start local server
 yarn install
 yarn start
 // wait and then you can look at it at http://localhost:3000
```

## References

https://redoc.ly/docs/developer-portal/organizing-files/
