export default async function newError(error) {
  let ErrorScreen = await import(/* webpackChunkName: "errorScreen" */ './error')
  ErrorScreen = ErrorScreen.default
  // eslint-disable-next-line new-cap
  return new ErrorScreen(error)
}
