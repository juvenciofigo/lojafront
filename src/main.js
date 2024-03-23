import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { useVuelidate } from "@vuelidate/core";
import "./assets/tailwind.css";
loadFonts();

// compontes

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// icones import
import { UserRound } from "lucide-vue-next";
import { ChevronDown } from "lucide-vue-next";
import { LayoutDashboard } from "lucide-vue-next";
import { FolderKanban } from "lucide-vue-next";
import { ShoppingBasket } from "lucide-vue-next";
import { ListOrdered } from "lucide-vue-next";
import { PersonStanding } from "lucide-vue-next";
import { ShoppingCart } from "lucide-vue-next";
import { Shirt } from "lucide-vue-next";
import { Search } from "lucide-vue-next";
import { Undo2 } from "lucide-vue-next";
import { X } from "lucide-vue-next";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const app = createApp(App);

// icones user
app.component("UserRound", UserRound);
app.component("ChevronDown", ChevronDown);
app.component("LayoutDashboard", LayoutDashboard);
app.component("FolderKanban", FolderKanban);
app.component("ShoppingBasket", ShoppingBasket);
app.component("ListOrdered", ListOrdered);
app.component("PersonStanding", PersonStanding);
app.component("ShoppingCart", ShoppingCart);
app.component("Shirt", Shirt);
app.component("Undo2", Undo2);
app.component("X", X);

// use compontes
app.component("Button", Button);
app.component("Input", Input);
app.component("Label", Label);

app.component("Separator", Separator);
app.component("Search", Search);

app.component("Dialog", Dialog);
app.component("DialogContent", DialogContent);
app.component("DialogDescription", DialogDescription);
app.component("DialogFooter", DialogFooter);
app.component("DialogHeader", DialogHeader);
app.component("DialogTitle", DialogTitle);
app.component("DialogTrigger", DialogTrigger);



app.component("Select", Select);
app.component("SelectContent", SelectContent);
app.component("SelectGroup", SelectGroup);
app.component("SelectItem", SelectItem);
app.component("SelectLabel", SelectLabel);
app.component("SelectTrigger", SelectTrigger);
app.component("SelectValue", SelectValue);

app.component("Popover", Popover);
app.component("PopoverContent", PopoverContent);
app.component("PopoverTrigger", PopoverTrigger);
app.component("Command", Command);
app.component("CommandDialog", CommandDialog);
app.component("CommandEmpty", CommandEmpty);
app.component("CommandGroup", CommandGroup);
app.component("CommandInput", CommandInput);
app.component("CommandList", CommandList);
app.component("CommandItem", CommandItem);
app.component("CommandSeparator", CommandSeparator);
app.component("CommandShortcut", CommandShortcut);
app.component("Collapsible", Collapsible);
app.component("CollapsibleContent", CollapsibleContent);
app.component("CollapsibleTrigger", CollapsibleTrigger);

app.use(useVuelidate);
app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
