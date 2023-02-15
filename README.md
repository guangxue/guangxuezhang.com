# [guangxuezhang.com](https://guangxuezhang.com)

A personal website written in Next.js and TypeScript and Tailwindcss. Built and maintained by [@guangxuezhang](https://guangxuezhang.com)

## Tech stack
[Next.js](https://nextjs.org/)

[Contentlayer](https://www.contentlayer.dev/)

[Prisma](https://www.prisma.io/) (considering)


## Built with appDir
Next.js appDir is amazing feature that you are no longer limited to `getStaticProps` and `getStaticPath`. Furthermore, this feature is the further of Next.js, so I decided to build with this feature.

### React.js feature that I used
1. States lift up: blog tags are using states lift up.
2. *and more, list here later..*


### Magic must defeat Magic!
The most popular way to build markdown blog are using `unified`, `rehype`, `remark` They all do their job and do it really good.

However, by using their powerful ecosystem, can be error prone and time consuming. It can cost you a great of time for debugging. To just setup a syntax highlighting feature that is cost me almost 2 days and failed eventually. So, I list some plugins on syntax highlighting that won't work on my [blog](https://guangxuezhang.com/blog/magic-must-defeat-magic).

Finally, the simpler way to make it works perfectly and stay away the chaos of `unified/rehype` ecosystem is using [Contentlayer](https://www.contentlayer.dev/). 

### Website still under construction
I'm still looking for inspiration on personal website..
Please add your page (and repo) for inspirations via a PR. 🙏

