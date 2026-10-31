/**
 * True while the app first mounts over pre-rendered HTML. Entrance animations are skipped then, so
 * content that is already on screen does not vanish and fade back in; later navigations animate as usual.
 */
export let mountingOverPrerender = false;

export function setMountingOverPrerender(value: boolean) {
  mountingOverPrerender = value;
}
