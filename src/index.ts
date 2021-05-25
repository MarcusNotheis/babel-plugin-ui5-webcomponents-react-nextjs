import * as t from "@babel/types";
import { expression } from "@babel/template";
import { NodePath } from "@babel/core";

function createNextDynamicImport(importStatement: any) {
  return t.callExpression(t.identifier("dynamic"), [
    t.arrowFunctionExpression([], importStatement()),
    t.objectExpression([
      t.objectProperty(t.stringLiteral("ssr"), t.booleanLiteral(false)),
    ]),
  ]);
}

export default function () {
  return {
    visitor: {
      ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
        if (path.node.source.value.startsWith("@ui5/webcomponents")) {
          const replacements = [];
          if (!path.parentPath.state?.nextJsDynamicImportAdded) {
            replacements.push(
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier("dynamic"))],
                t.stringLiteral("next/dynamic")
              )
            );
            path.parentPath.state = { nextJsDynamicImportAdded: true };
          }

          const hasImportSpecifiers = path.node.specifiers.length > 0;

          if (hasImportSpecifiers) {
            for (const importSpecifier of path.node.specifiers) {
              replacements.push(
                t.variableDeclaration("const", [
                  t.variableDeclarator(
                    importSpecifier.local,
                    createNextDynamicImport(
                      t.isImportSpecifier(importSpecifier)
                        ? expression(
                            `import('${
                              path.node.source.value
                            }').then(mod => mod['${
                              t.isStringLiteral(importSpecifier.imported)
                                ? importSpecifier.imported.value
                                : importSpecifier.imported.name
                            }'])`
                          )
                        : expression(`import('${path.node.source.value}')`)
                    )
                  ),
                ])
              );
            }
          } else {
            replacements.push(
              createNextDynamicImport(
                expression(`import('${path.node.source.value}')`)
              )
            );
          }

          path.replaceWithMultiple(replacements);
        }
      },
    },
  };
}
