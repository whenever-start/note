function hasSelector(element: HTMLElement, selector: string) {
  // const elements: HTMLElement[] = [
  //   ...document.querySelectorAll(selector)
  // ] as HTMLElement[]
  const elements = [...document.querySelectorAll(selector)]
  console.log(elements[0].nodeType)
  return elements.indexOf(element) !== -1
}
