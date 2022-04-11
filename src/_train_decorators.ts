// function Component(userId: number) {
//     console.log('init')
//     return (target: Function) => {
//         console.log('run')
//         target.prototype.id = userId
//     }
// }
//
// function Method(
//     target: Object,
//     propertyKey: string,
//     propertyDescriptor: PropertyDescriptor
// ) {
//     console.log(target)
//     console.log(propertyKey)
//     console.log(propertyDescriptor.value)
// }
//
// function Prop(
//     target: Object,
//     propertyKey: string
// ) {
//     let value: number;
//
//     const getter = () => {
//         console.log('Get!')
//         return value;
//     }
//
//     const setter = (newId: number) => {
//         console.log('Set!')
//         value = newId;
//     }
//
//     Object.defineProperty(target, propertyKey, {
//         set: setter, get: getter
//     })
// }
//
// function Param(
//     target: Object,
//     propertyKey: string,
//     index: number
// ) {
//     console.log(propertyKey, index)
// }
//
// @Component(1)
// export class User {
//     @Prop id: number;
//
//     @Method
//     updateId(@Param newId: number) {
//         this.id = newId
//         return this.id
//     }
// }
//
// // console.log(new User().id)
// // console.log(new User().updateId(4))
