// compontes

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

// use compontes
app.component("Button", Button);
app.component("Input", Input);
app.component("Separator", Separator);

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

export var icons = ["Separator"];
export var comp = [Separator];
