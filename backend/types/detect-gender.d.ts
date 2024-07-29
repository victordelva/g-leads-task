declare module 'detect-gender' {
  function detectGender(name: string): Promise<'female' | 'male'>

  export = detectGender
}
