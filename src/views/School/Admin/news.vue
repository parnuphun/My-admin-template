<script setup lang="ts">
import AdminNavigationBar from '../../../components/layout/AdminNavigationBar.vue';
import { ref } from 'vue';
import MsgAlert from '../../../services/msgAlert';

const _msg = new MsgAlert();

const previewNewAnnoceDialgo = ref(false) 
const tab = ref()

interface newsType {
    news_id: number,
    news_image: string,
    news_name: string,
    news_date: string,
}
const news_topic = ref<Array<newsType>>([
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    {
        news_id: 1,
        news_image: `https://storage.googleapis.com/classcraft-1188.appspot.com/uploads/2019/10/2019-10-wrap-up-activities-for-students_Google-Edu-blog-list-image.png`,
        news_name: `new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@))))new stop poci sa; laskd_)@!#_)!@#(!@)_#)!_@#(@!%&*)(!@(#_!@#(+!@#!+@_%*#(@)) `,
        news_date: '1 ตุลาคม 2656',
    },
    
    
])

interface newsAnnoce {
    news_ann_id: number,
    news_ann_name: string,
    news_ann_image: string,
    news_ann_date: string,
}
const news_annoce = ref<Array<newsAnnoce>>([
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
    {
        news_ann_id: 1,
        news_ann_name: 'ฟหกกหกหกหกหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหหห',
        news_ann_image: 'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kJHl6Jwbov8AX8SxUe2&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUTI_ioPSIFueUCT6tto_LdHr1L6nKF0sa5JRMJOYvQQ&oe=657ABE5F',
        news_ann_date: '3 ธันวาคม 1454',
    },
])

function lightBox(image:string){
    _msg.lightBox(image)
}
</script>

<template>
    <AdminNavigationBar>
        <div class="flex flex-col w-full h-full border-gray-300 border-2 ">
            <div class="w-full h-full flex flex-col overflow-hidden bg-white">
                <div class="w-full h-full flex justify-between">
                    <v-card class="w-full h-full">
                        <v-tabs class="w-full text-xl" v-model="tab" color="white" bg-color="pink">
                            <v-tab value="one" size="large" prepend-icon="mdi-newspaper">ข่าวสาร</v-tab>
                            <v-tab value="two" size="large" prepend-icon="mdi-bullhorn-variant">ประกาศ</v-tab>
                        </v-tabs>

                        <v-card-text class=" h-[93%]">
                            <v-window v-model="tab" class="h-full">
                                <v-window-item value="one" class="h-full ">
                                    <div class="w-full h-full flex flex-col">
                                        <div class="w-full h-[75px] min-[75px] bg-whiteflex justify-between items-center px-2">
                                            <div class="w-full h-full flex flex-row justify-start items-center gap-2">
                                                <div class="w-[70%]">
                                                    <v-text-field label="ค้นหา" class="" hide-details variant="outlined"
                                                        prepend-inner-icon="mdi-magnify" bg-color="" density="comfortable"
                                                        required></v-text-field>
                                                </div>
                                                <div class="flex h-full items-center justify-center ">
                                                    <v-btn class="h-full" color="pink" size="large">
                                                        <p class="text- -500 text-md">
                                                            <v-icon icon="mdi-file"></v-icon> เพิ่มกระทู้
                                                        </p>
                                                    </v-btn>
                                                </div>
                                                <div class="w-[30%] flex justify-end">
                                                    <v-pagination density="comfortable" :length="4"></v-pagination>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-full h-full">
                                            <div class="bg-white w-full h-full ">
                                                <v-table class="h-[92%] overflow-auto" fixed-header>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left w-10">
                                                                #
                                                            </th>
                                                            <th class="text-center w-[230px]">
                                                                รูปภาพ
                                                            </th>
                                                            <th class="text-left w-auto">
                                                                ชื่อ
                                                            </th>
                                                            <th class="text-center w-40 ">
                                                                วันที่
                                                            </th>
                                                            <th class="text-center w-44">
                                                                จัดการ
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="hover:bg-gray-300" v-for="(item, i) in news_topic"
                                                            :key="item.news_id">
                                                            <td> {{ i + 1 }} </td>
                                                            <td class="py-1 ">
                                                                <img :src="item.news_image"
                                                                    class="object-fill h-[100px] w-[200px]" alt="">
                                                            </td>
                                                            <td>
                                                                <p class="line-clamp-3">
                                                                    {{ item.news_name }}
                                                                </p>
                                                            </td>
                                                            <td class="text-center"> {{ item.news_date }} </td>
                                                            <td>
                                                                <div
                                                                    class="w-fit flex flex-row justify-end items-center gap-1">
                                                                    <v-btn>
                                                                        <p class="text-green-500">
                                                                            <v-icon icon="mdi-book-open"></v-icon>
                                                                        </p>
                                                                    </v-btn>
                                                                    <v-btn>
                                                                        <p class="text-blue-500">
                                                                            <v-icon icon="mdi-pencil"></v-icon>
                                                                        </p>
                                                                    </v-btn>
                                                                    <v-btn>
                                                                        <p class="text-red-500">
                                                                            <v-icon icon="mdi-delete"></v-icon>
                                                                        </p>
                                                                    </v-btn>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </div>
                                        </div>
                                    </div>
                                </v-window-item>


                                <v-window-item value="two" class="h-full">
                                    <div class="w-full h-full flex flex-col">
                                        <div class="w-full h-[75px] min-[75px] bg-whiteflex justify-between items-center px-2">
                                            <div class="w-full h-full flex flex-row justify-start items-center gap-2">
                                                <div class="w-[70%]">
                                                    <v-text-field label="ค้นหา" class="" hide-details variant="outlined"
                                                        prepend-inner-icon="mdi-magnify" bg-color="" density="comfortable"
                                                        required></v-text-field>
                                                </div>
                                                <div class="flex h-full items-center gap-2 justify-center ">
                                                    <v-btn class="h-full" color="pink" size="large">
                                                        <p class="text- -500 text-md">
                                                            <v-icon icon="mdi-plus"></v-icon> เพิ่มประกาศ
                                                        </p>
                                                    </v-btn>
                                                    <v-btn class="h-full" color="pink" size="large" 
                                                    @click="previewNewAnnoceDialgo = !previewNewAnnoceDialgo ;">
                                                        <p class="text- -500 text-md">
                                                            <v-icon icon="mdi-eye"></v-icon> ดูประกาศ
                                                        </p>
                                                    </v-btn>
                                                </div>
                                                <div class="w-[30%] flex justify-end">
                                                    <v-pagination density="comfortable" :length="4"></v-pagination>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-full h-full">
                                            <div class="bg-white w-full h-full ">
                                                <v-table class="h-[92%] overflow-auto" fixed-header>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left w-10">
                                                                #
                                                            </th>
                                                            <th class="text-center w-[230px]">
                                                                รูปภาพ
                                                            </th>
                                                            <th class="text-left w-auto">
                                                                ชื่อ
                                                            </th>
                                                            <th class="text-center w-40 ">
                                                                วันที่
                                                            </th>
                                                            <th class="text-center w-20 ">
                                                                ปักหมุด
                                                            </th>
                                                            <th class="text-center w-44">
                                                                จัดการ
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="hover:bg-gray-300" v-for="(item, i) in news_annoce"
                                                            :key="item.news_ann_id">
                                                            <td> {{ i + 1 }} </td>
                                                            <td class="py-1 ">
                                                                <img :src="item.news_ann_image"
                                                                    class="object-fill h-[100px] w-[200px] cursor-pointer
                                                                    scale-100 hover:scale-[1.2] duration-300" 
                                                                    alt=""
                                                                    @click="lightBox(item.news_ann_image)"
                                                                    >
                                                            </td>
                                                            <td>
                                                                <p class="line-clamp-3">
                                                                    {{ item.news_ann_name }}
                                                                </p>
                                                            </td>
                                                            <td class="text-center"> {{ item.news_ann_date }} </td>
                                                            <td class="">
                                                                <div class="w-full flex justify-center items-center ">
                                                                    <v-switch  
                                                                        :value="true"
                                                                        density="compact" 
                                                                        inset 
                                                                        hide-details 
                                                                        color="green">
                                                                    </v-switch>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    class="w-fit flex flex-row justify-end items-center gap-1">
                                                                    <v-btn>
                                                                        <p class="text-blue-500">
                                                                            <v-icon icon="mdi-pencil"></v-icon>
                                                                        </p>
                                                                    </v-btn>
                                                                    <v-btn>
                                                                        <p class="text-red-500">
                                                                            <v-icon icon="mdi-delete"></v-icon>
                                                                        </p>
                                                                    </v-btn>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </v-table>
                                            </div>
                                        </div>
                                    </div>
                                </v-window-item>
                            </v-window>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </div>
    </AdminNavigationBar>

    <v-dialog
        v-model="previewNewAnnoceDialgo"
        width="800"
        transition="dialog-bottom-transition"
    >
        <v-card class="pb-2">
            <div class="relative w-full h-auto">
                <div class="sticky w-full h-full top-0 right-0 z-20 bg-white">
                    <div class="relative w-full text-center py-6 text-2xl text-pink-500 flex justify-center items-center">
                        <div class="less:text-lg md:text-3xl xl:text-4xl">
                            📢 ประกาศจากทางโรงเรียน
                        </div>
                        <div class="absolute top-0 right-0 h-20 w-20 text-pink-500 text-3xl flex 
                        justify-center items-center cursor-pointer hover:text-pink-300"
                        @click="previewNewAnnoceDialgo = !previewNewAnnoceDialgo ;">
                            <v-icon icon="mdi-close"></v-icon>
                        </div>
                    </div>

                    <v-divider></v-divider>
                </div>
                <div class="w-full flex flex-col px-2">
                    <div class="w-full " v-for="item of news_annoce">
                        <div class=" w-full h-full">
                            <img :src="(item as any).news_ann_image" alt="" 
                            class="my-2 px-2 rounded-lg cursor-pointer w-full scale-100 hover:scale-[1.01] duration-500">
                        </div>
                    <v-divider></v-divider>
                    </div>

                </div>
            </div>
        </v-card>
        </v-dialog>
</template>