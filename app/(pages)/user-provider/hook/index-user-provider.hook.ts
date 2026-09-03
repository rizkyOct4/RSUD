"use client"

import { useMutationPostCar } from "./mutation/POST.mutation"

export const useUserCarProviderHookIndex = (publicId: string, currentPath: string) => {

    const MPostCar = useMutationPostCar(currentPath)

    return {
        ...MPostCar
    }
}

