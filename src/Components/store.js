import create from 'zustand'

 const [useStore] = create(set => ({
    data:[],
    ptrash:[],
    ctrash:[],
    update:(prop) =>
        set(state => ({data:prop.filter(item=>item)})),
    updateposts:(prop) =>
        set(state => ({ptrash:prop.filter(item=>item)})),
   updatecomments :(prop) =>
        set(state => ({ctrash:prop.filter(item=>item)})),
    }))

 export {useStore};