import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getAnnouncement as fetchAnnouncement } from '@/utils/user'

export interface Announcement {
  id: number
  announcement: string
  show: boolean
  pin: boolean
  create_time: number
  edit_time: number
}

interface AnnouncementStore {
  announcementList: Ref<Announcement[]>
  getAnnouncement: () => Announcement[] | null
  updateAnnouncement: () => Promise<void>
}

export const useAnnouncementStore = defineStore(
  'announcement',
  (): AnnouncementStore => {
    const announcementList = ref<Announcement[]>([])

    const getAnnouncement = () => {
      return announcementList.value
    }

    let updateAnnouncementPromise: Promise<void> | null = null
    const updateAnnouncement = async () => {
      // 如果已经有更新在进行，返回现有的Promise
      if (updateAnnouncementPromise) {
        return updateAnnouncementPromise
      }
      // 创建新的更新Promise
      updateAnnouncementPromise = (async () => {
        try {
          const res = await fetchAnnouncement()
          if (res.result) {
            announcementList.value = res.result
          }
        } finally {
          // 更新完成后清除Promise引用
          updateAnnouncementPromise = null
        }
      })()
      return updateAnnouncementPromise
    }

    return {
      announcementList,
      getAnnouncement,
      updateAnnouncement,
    }
  },
  {
    persist: true,
  },
)
