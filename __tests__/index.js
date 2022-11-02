import plugin from "../src/index";
import { transformSync } from "@babel/core";

describe("transform imports", () => {
  it("transform web component import", () => {
    const src = `
        import '@ui5/webcomponents/dist/Button';
        import '@ui5/webcomponents/dist/Assets';
        `;

    const result = transformSync(src, {
      plugins: [plugin],
    });
    expect(result.code).toMatchInlineSnapshot(`
      "import dynamic from "next/dynamic";
      dynamic(() => import('@ui5/webcomponents/dist/Button'), {
        "ssr": false
      })
      dynamic(() => import('@ui5/webcomponents/dist/Assets'), {
        "ssr": false
      })"
    `);
  });

  it("transform web components react import", () => {
    const src = `
        import { Avatar } from '@ui5/webcomponents-react';
        import { Button } from '@ui5/webcomponents-react/dist/Button';
        import { FlexBox as SuperFancyFlexBoxComponent } from '@ui5/webcomponents-react';
        import { Form, Grid, Label as MuchWowLabel } from '@ui5/webcomponents-react';
        `;

    const result = transformSync(src, {
      plugins: [plugin],
    });
    expect(result.code).toMatchInlineSnapshot(`
      "import dynamic from "next/dynamic";
      const Avatar = dynamic(() => import('@ui5/webcomponents-react').then(mod => mod['Avatar']), {
        "ssr": false
      });
      const Button = dynamic(() => import('@ui5/webcomponents-react/dist/Button').then(mod => mod['Button']), {
        "ssr": false
      });
      const SuperFancyFlexBoxComponent = dynamic(() => import('@ui5/webcomponents-react').then(mod => mod['FlexBox']), {
        "ssr": false
      });
      const Form = dynamic(() => import('@ui5/webcomponents-react').then(mod => mod['Form']), {
        "ssr": false
      });
      const Grid = dynamic(() => import('@ui5/webcomponents-react').then(mod => mod['Grid']), {
        "ssr": false
      });
      const MuchWowLabel = dynamic(() => import('@ui5/webcomponents-react').then(mod => mod['Label']), {
        "ssr": false
      });"
    `);
  });
});
