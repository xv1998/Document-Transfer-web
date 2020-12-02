import {
  Menu,
  Submenu,
  MenuItem,
  Upload,
  MenuItemGroup,
  Option,
  OptionGroup,
  Input,
  Tree,
  Dialog,
  Button,
  Card,
  Row,
  Col,
} from "element-ui";
const element = {
  install: function(Vue) {
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Upload);
    Vue.use(Button);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Input);
    Vue.use(Tree);
    Vue.use(Dialog);
    Vue.use(Card);
    Vue.use(Row);
    Vue.use(Col);
  },
};
export default element;
