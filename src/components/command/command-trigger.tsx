import { commandLinks } from "./items";
import { CommandTriggerClient } from "./command-trigger-client";

export function CommandTrigger() {
  return <CommandTriggerClient links={commandLinks()} />;
}
