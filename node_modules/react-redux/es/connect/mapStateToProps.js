import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps';
export function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
export function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
export default [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];