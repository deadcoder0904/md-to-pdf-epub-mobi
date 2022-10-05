const mdxOptions = (options, frontmatter) => {
  options.remarkPlugins = [
    ...(options.remarkPlugins ?? []),
    [remarkCover, { name: `cover`, from: frontmatter.cover }],
  ]

  options.rehypePlugins = [...(options.rehypePlugins ?? [])]

  return options
}

export const remarkCover = (options = {}) => {
  return (ast) => {
    const name = options.name || `cover`

    ast.children.unshift({
      type: `mdxjsEsm`,
      value: `export { default as ${name} } from '${options.from}'`,
      data: {
        estree: {
          type: `Program`,
          body: [
            {
              type: `ExportNamedDeclaration`,
              declaration: null,
              specifiers: [
                {
                  type: `ExportSpecifier`,
                  local: {
                    type: `Identifier`,
                    name: `default`,
                  },
                  exported: {
                    type: `Identifier`,
                    name,
                  },
                },
              ],
              source: {
                type: `Literal`,
                value: options.from,
                raw: `'${options.from}'`,
              },
            },
          ],
          sourceType: `module`,
        },
      },
    })
  }
}
