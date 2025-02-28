import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "1@1.com",
    password: "test1234",
    role: "ADMIN",
  },
];

const postData: Prisma.PostCreateInput[] = [
  {
    title: "My first post",
    tags: {
      create: [
        {
          tag: {
            connectOrCreate: {
              where: { name: "教程" },
              create: { name: "教程" },
            },
          },
        },
        {
          tag: {
            connectOrCreate: {
              where: { name: "技术" },
              create: { name: "技术" },
            },
          },
        },
      ],
    },
    content: `# Header 1

## Header 2

### Header 3

#### Header 4

### 2. Emphasis

You can emphasize text using _italic_ or **bold** formatting.

- _Italic text_
- **Bold text**
- **_Bold and italic text_**

### 3. Lists

#### Unordered List

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

#### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2

### 4. Links and Images

You can add links and images:

- [OpenAI](https://www.openai.com)
- ![Sample Image](https://picsum.photos/200)

### 5. Code

You can include inline code like \`print("Hello, World!")\` or code blocks:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

`,
    slug: "my-first-post",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }

  for (const p of postData) {
    await prisma.post.create({ data: p });
  }
}

main();
