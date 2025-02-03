// src/components/ErrorBoundary.tsx
"use client"
import { ErrorBoundary } from 'react-error-boundary'
import { addToast } from "@/store/toastSlice"
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store/store"
interface Props {
   children:React.ReactNode
}
function ErrorFallback({error}:{error:Error}){
    const dispatch = useDispatch<AppDispatch>()

    dispatch(addToast({ type:"error", message:`An error has occurred: ${error.message}`}))
     return <div>Error: {error.message}</div>
}
export default function ReactErrorBoundary({children}:Props){
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}