// import 'reflect-metadata';
//
// function Injectable(key: string){
//     return (target: Function) => {
//         Reflect.defineMetadata(key, 1, target)
//         const meta = Reflect.getMetadata(key, target)
//         console.log(meta)
//     }
// }
//
// function Inject(key: string){
//
// }
//
// function Prop(target: Object, name: string) {
//
// }
//
// @Injectable('test')
// export class C {
//     @Prop prop: number;
// }
//
// @Injectable('test')
// export class D {
//     constructor(@Inject('C') c: C) {
//     }
// }