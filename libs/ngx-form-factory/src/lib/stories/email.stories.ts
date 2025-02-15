import { MatCardModule } from "@angular/material/card";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ArgTypes, Meta, Story } from "@storybook/angular";
import { Field, EFieldType } from "../fields";
import { NgxFormFactoryModule } from "../ngx-form-factory.module";
import { commonArgTypes, matInputArgType } from "./common_arg_types";
import { ARGS, convertArgsToProps, FieldModelerComponent } from "./field_modeler_component";
import field_options from "./field_options";
import { typeControl } from "./type_control";
import { emailArgType, maxLengthArgType, minLengthArgType, patternArgType, requiredArgType } from "./validation_arg_types";


const argTypes: ArgTypes = {
  ...commonArgTypes(),
  ...matInputArgType
};

export default {
  title: "EmailField",
  component: FieldModelerComponent,
  argTypes: argTypes,
} as Meta;

const Story: Story = (args, context) => ({
  moduleMetadata: {
    declarations: [FieldModelerComponent],
    imports: [BrowserAnimationsModule, NgxFormFactoryModule, MatCardModule],
    providers: [
      {
        provide: ARGS,
        useValue: (() => {
          const props = convertArgsToProps(args);
          return {
            field: new Field({
              ...field_options(args),
              type: EFieldType.EMAIL,
            }),
            ...props
          }
        })()
      }
    ],
  },
  props: args,
});

export const Default = Story.bind({});
export const WithValidation = Story.bind({});

Default.argTypes = {
  ...typeControl(),
}
Default.args = {
  type: EFieldType.EMAIL,
  autocomplete:'email'
}
WithValidation.argTypes = {
  ...argTypes,
  ...typeControl(),
  ...requiredArgType,
  ...maxLengthArgType,
  ...minLengthArgType,
  ...emailArgType,
  ...patternArgType
};
WithValidation.args = {
  type: EFieldType.EMAIL
}
