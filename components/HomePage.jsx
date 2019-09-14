import React, { useState, useEffect } from 'react'
import Router from 'next/router'

import MainLayout from './layout/MainLayout'
import { refreshToken } from '../spotify/auth'

export function HomePage() {
  const [percentage, setPercentage] = useState(0)

  async function getMe() {
    try {
    } catch (error) {
      if (error.response.data.error.status === 401) {
        const { data } = await refreshToken()

        if (!data.access_token) {
          return Router.push('/signout')
        }

        return window.location.reload()
      }
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  function getTimelinePercentage() {
    setTimeout(() => {
      if (percentage >= 100) {
        return setPercentage(0)
      }

      const new_percentage = percentage + 0.5

      if (percentage < 100 && new_percentage > 100) {
        return setPercentage(100)
      }

      setPercentage(new_percentage)
    }, 400)
  }

  getTimelinePercentage()

  return (
    <MainLayout tab="home">
      <div className="w-full sm:w-1/2 lg:w-1/3 mx-auto" style={{ minWidth: 400 }}>
        <div className="flex flex-col justify-center items-center">
          <div className="py-2 mb-4">
            <img
              className="object-center object-cover h-64 shadow-md"
              src="https://i.scdn.co/image/e3aeb84d179f0ad65e10ee09d135e2ba2f3a7694"
              alt="album-cover"
            />
          </div>
          <div className="w-full px-10">
            <p className="font-bold text-xl">Pretender</p>
            <p className="">Official HIGE DANdism</p>
            <div className="mt-8 h-1 bg-gray-400 rounded-full">
              <div
                className="bg-gray-900 h-1 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="w-full px-10 mt-8">
            <p className="mb-4">Next</p>
            <div className="w-full py-4 flex items-center h-20 mb-4">
              <img
                className="object-center object-cover shadow-md w-20 h-20"
                src="https://i.scdn.co/image/e3aeb84d179f0ad65e10ee09d135e2ba2f3a7694"
                alt="album-cover"
              />

              <div className="px-4 flex flex-col justify-center">
                <p className="font-bold">Pretender</p>
                <p className="">Official HIGE DANdism</p>
                <p className="text-sm text-gray-500">Added by: Chanon Thongsuk</p>
              </div>
            </div>
            <div className="w-full py-4 flex items-center h-20 mb-4">
              <img
                className="object-center object-cover shadow-md w-20 h-20"
                src="https://i.scdn.co/image/510a90b3bac96fbf6ab13500bcf89b70b4173d34"
                alt="album-cover"
              />

              <div className="px-4 w-full flex flex-col justify-center">
                <p className="font-bold">ผี - Ghost</p>
                <p className="">UrboyTJ, Maiyarap</p>
                <p className="text-sm text-gray-500">Added by: Chanon Thongsuk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
