<script setup lang="ts">
import AdminNavigationBar from '../../components/layout/AdminNavigationBar.vue';
import {ref , onMounted} from 'vue'
import apiMovie from '../../services/api/MyWebSite/api_movie_list';
import MsgAlert from '../../services/msgAlert';

onMounted(()=>{
    getAllMovieList()
})

const _api_movie_list = new apiMovie()
const _msg = new MsgAlert()

const isDialogOpen = ref(false)
const movieList = ref()
const totalCount = ref()

const newTitle = ref<string>('')
const newPoster = ref<string>('')
const newRating = ref<number>(0)
const newStatus = ref<string>('')

function addNewTitle() {
    let sendStatus: number = 0
    if(newStatus.value === 'จะดู'){
        sendStatus = 0
    }else{
        sendStatus = 1
    }

    let data = {
        title : newTitle.value ,
        poster : newPoster.value ,
        rating : newRating.value ,
        status : sendStatus
    }
    _api_movie_list.addNewTitle(data).then((res)=>{
        if(res.data.status){
            _msg.toast_msg({title:'Success !!', icon:'success',msg:res.data.msg , timer: 5 , progressbar:true})
            getAllMovieList()
        }else{
            _msg.toast_msg({title:'Error !!', icon:'error' ,msg:res.data.msg , timer: 5 , progressbar:true})
        }
        newTitle.value = ''
        newPoster.value = ''
        newRating.value = 0
        newStatus.value = ''

        isDialogOpen.value = false
    })
}

function getAllMovieList() {
    _api_movie_list.getAllMovieList().then((res)=>{
        movieList.value = res.data.movieList
        totalCount.value = movieList.value.length
    })
}

function randomTitle(){
    _msg.lightBox(movieList.value[Math.floor(Math.random() * Number(totalCount.value)) + 1].Movie_List_Poster,'400px')
}
</script>

<template>
    <AdminNavigationBar>
        <div class="w-full flex flex-col">
            <div class="w-full flex justify-center gap-3">

                <v-btn color="grey">
                    <v-icon class="mr-2" icon="mdi-movie"></v-icon>
                    ทั้งหมด {{ totalCount }}
                </v-btn>
                <v-btn color="primary" @click="isDialogOpen = !isDialogOpen">
                    <v-icon class="mr-2" icon="mdi-movie-plus"></v-icon>
                    เพิ่ม
                </v-btn>
                <v-btn color="info" @click="randomTitle()">
                    <v-icon class="mr-2" icon="mdi-movie-search"></v-icon>
                    สุ่ม
                </v-btn>
            </div>
            <div class="w-full flex flex-wrap justify-center gap-3">
                <div class="mt-3 w-auto" v-for="movie of movieList">
                    <img
                        :src="movie.Movie_List_Poster"
                        style="width:180px; height:230px;"
                        class="object-cover rounded-lg cursor-pointer"
                        alt=""
                        @click="()=>{ _msg.lightBox(movie.Movie_List_Poster,'400px')}"
                    >
                </div>
            </div>
         </div>
    </AdminNavigationBar>

    <v-dialog width="560px" v-model="isDialogOpen" persistent>
        <v-card>
            <v-card-title class="p-6 bg-blue-500  text-white text-center">
                <span class="text-2xl"> เพิ่ม </span>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addNewTitle">
                    <div class="w-full">
                        <v-text-field
                            v-model="newTitle"
                            label="ชื่อเรื่อง"
                            density="compact"
                            bg-color="#e5e7eb"
                        >
                        </v-text-field>
                    </div>
                    <div class="w-full">
                        <v-text-field
                            v-model="newPoster"
                            label="โปสเตอร์"
                            density="compact"
                            bg-color="#e5e7eb"
                        >
                        </v-text-field>
                    </div>
                    <div class="w-full">
                        <v-combobox
                            v-model="newStatus"
                            label="สถานะ"
                            :items="['จะดู', 'ดูแล้ว']"
                            density="compact"
                            bg-color="#e5e7eb"
                        ></v-combobox>
                    </div>
                    <!-- <div class="w-full flex flex-col">
                        <div class="-mt-2 w-full flex justify-center">
                            <v-rating
                                color="amber"
                                v-model="newRating"
                                hover
                                density="default"
                                length="10"
                            ></v-rating>
                        </div>
                    </div> -->
                    <div class="mt-2 w-full flex flex-row justify-center items-center gap-3">
                        <v-btn color="primary" type="submit"> Add </v-btn>
                        <v-btn color="error" @click="isDialogOpen = false "> Cancel </v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
