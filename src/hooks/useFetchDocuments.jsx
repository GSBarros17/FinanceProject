import { useState, useEffect } from "react";
import { db } from "../firebase/config"
import { collection, query, orderBy, onSnapshot, where} from "firebase/firestore";

export const useFetchDocuments = (docCollection, uid = null, idService = null) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    
    //deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData(){
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)
            
            try {
                let q
                
                if(uid){
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createAt", "desc"))
                } else if (idService) {
                    q = await query(collectionRef, where("idService", "==", idService), orderBy("createAt", "desc"))
                } else {
                    q = await query(collectionRef, orderBy("createAt", "desc"))
                }
                
                await onSnapshot(q, (querySnapshot) => {

                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )


                })

                setLoading(false)

            } catch (error) {
                console.log(error)
                setError(error.message)

                setLoading(false)
            }
        }
        loadData()
    }, [docCollection, uid, idService, cancelled])

    useEffect(()=> {
        return () => setCancelled(true)
    }, [])

    return { documents, loading, error }    
}

