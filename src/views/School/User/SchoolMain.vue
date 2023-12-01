<script setup lang="ts">
    import { ref } from 'vue';
    import NampongNavBar from '../../../components/layout/School/NampongNavBar.vue'
    import CountUp from 'vue-countup-v3'
    import {imageGalleryType} from '../../../store/Interface'
    import NampongFooter from './../../../components/layout/School/NampongFooter.vue'
    import { useRouter , useRoute} from 'vue-router';
    //route
    const router = useRouter()
    const currentPath = useRoute()

    const dialog = ref<boolean>(false)
    const readit = ref<boolean>(false)

    function getCurrentPath(url:string){
        router.push(url)
    }
    const tab = ref<string>('option-1')

    const imageGallery = ref<Array<imageGalleryType>>([
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981'
        },
         
    ]
    )

    const bannerPin = ref<Array<Object>>([
        {
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            url:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
         
    ])


    const newRelase = ref<Array<Object>>([        
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981',
        },
    ])
</script>

<template>

    <div class="flex flex-col w-full relative">
        <div @click="dialog = !dialog ; readit = true"
        class="mb-8 mr-8 fixed h-20 w-20 rounded-full bg-pink-50 bottom-0 right-0 bg border-4 border-pink-500
         hover:bg-pink-500 text-3xl cursor-pointer flex justify-center items-center duration-500 z-20">
            📢
            <span v-if="readit === false" 
             class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
        </div>
        <NampongNavBar></NampongNavBar>

        <!-- Banner -->
        <div class="w-full h-[auto] max-h-[600px] bg-gradient-to-tr flex justify-center items-start z-10" >
            <v-parallax class="less:h-[200px] xl:h-[500px]"
                src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9534ce&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=5e2Uc0Wvzi0AX--NPmB&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDOj9yMWi6MYaTo7kNniHp8s0NLgnz3N39SxfEQ2noMfw&oe=656EF981">
                    <div class="relative w-full h-full flex justify-center items-center bg-black opacity-40"></div>
                    <div class="absolute w-full h-full flex justify-center items-center top-0">
                        <p class=" less:text-md md:text-5xl lg:text-6xl text-white font-bold">
                            “ คนดี มีวินัย ใฝ่คุณธรรม เลิศล้ำวิชาการ ”
                        </p>
                    </div>
            </v-parallax>
        </div>

        <!-- news relese -->
        <div class="w-full h-auto p-10 flex justify-center items-center">
            <div class="w-[1200px] h-auto flex flex-col">
                <div class="xl:p-4 less:p-2 flex flex-row justify-between items-center">
                    <div class="text-pink-500 border-l-8 border-pink-500 less:text-xl xl:text-2xl py-4 pl-4">
                        ข่าวประชาสัมพันธ์
                    </div>
                    <div class="text-pink-500 less:sm xl:text-lg hover:text-pink-300 cursor-pointer" @click="getCurrentPath('/news')">
                        อ่านข่าวทั้งหมด
                    </div>
                </div>
                <div class="w-full h-auto flex flex-wrap justify-start items-start">
                    <div class="xl:w-1/4 lg:w-1/4 md:w-1/4 sm:w-1/2 less:w-1/2 h-auto xl:p-4 flex flex-col 
                    group  cursor-pointer less:px-2 mt-2" 
                    v-for="news of newRelase">
                        <div class="w-full h-[200px] flex flex-col  ">
                            <img class="w-full h-full object-cover group-hover:brightness-50 duration-500" 
                            :src="(news as any).src" alt=""> 
                        </div>
                        <div class="w-full h-full flex flex-col justify-start items-start">
                            <p class="px-2 text-xl line-clamp-1 mt-3 group-hover:text-pink-500 duration-500">
                                {{ (news as any).title }}
                            </p>
                        </div>
                        <div class="w-full h-full flex justify-start">
                            <p class="px-2 text-sm line-clamp-1 text-gray-400  group-hover:text-pink-500 duration-500">
                                {{ (news as any).date }}
                            </p>
                        </div>
                        <div class="w-full h-[80px]">
                            <p v-if="(news as any).description != ''" 
                            class="px-2 text-sm line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                {{ (news as any).description }}
                            </p>
                            <p v-else
                            class="px-2 text-sm text-gray-400 line-clamp-3 mt-3 group-hover:text-pink-500 duration-500">
                                ไม่มีคำอธิบาย
                            </p>
                        </div>
                        <div class="px-2 w-full mb-4 text-white bg-pink-400 hover:bg-pink-500 p-3 text-center mt-3 cursor-pointer duration-500">
                            อ่านเพิ่มเติม
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- main menu -->
        <div class="w-full h-auto flex justify-center">
            <div class="w-[1200px] h-auto flex flex-col bg-white">
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-newspaper" class="mr-3"></v-icon> ข่าวประชาสัมพันธ์
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-account" class="mr-3"></v-icon> บุคลากรของเรา
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-book" class="mr-3"></v-icon> หลักสูตร
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-file" class="mr-3"></v-icon> เอกสาร
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-account-school" class="mr-3"></v-icon> ข้อมูลนักเรียน
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-table" class="mr-3"></v-icon> ตารางเรียน
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md" @click="getCurrentPath('/gallery')"> 
                        <v-icon icon="mdi-image" class="mr-3"></v-icon> ภาพกิจกรรม
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-information" class="mr-3"></v-icon> เกี่ยวกับเรา
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-md"> 
                        <v-icon icon="mdi-phone" class="mr-3"></v-icon> ติดต่อเรา
                    </div>
                </div>
            </div>
        </div>

        <!-- image gallery -->
        <div class="w-full h-auto bg-white pb-4 flex justify-center">
            <div class="w-[1200px] h-auto flex flex-col justify-center items-center ">
                <div class="w-max bg-white h-auto pt-6 pb-4 mb-4 less:text-xl xl:text-3xl text-center text-pink-500">
                    <div class="text-center text-pink-500 w-max h-full">
                        <!-- <v-icon end icon="mdi-image"></v-icon> ภาพกิจกรรม -->
                        ~ ภาพกิจกรรมบางส่วนจากทางโรงเรียน ~
                    </div>
                </div>

                <div class="w-full">
                    <div class="w-full h-auto flex flex-wrap justify-between items-center">
                        <div class="w-full h-full flex flex-wrap justify-center items-center pb-4">
                            <div v-for="item of imageGallery" class="relative group 
                            lg:w-1/4 md:w-1/3 sm:w-1/3 less:w-1/2 xl:w-1/4 
                            lg:h-[250px] md:h-[200px] less:h-[200px] xl:h-[250px] 
                            cursur-pointer px-1 mt-2">
                                <img class="object-cover w-full h-full scale-100 group-hover:scale-[1.01] duration-500
                                            group-hover:brightness-50 cursor-pointer rounded-lg" 
                                :src="item.url" alt="">
                                <div class="absolute w-full h-full p-3 text-white  top-0 flex justify-start items-end cursor-pointer
                                            scale-100 group-hover:scale-[1.01] duration-500 opacity-0 group-hover:opacity-100">
                                    <p class="line-clamp-3 text-lg">
                                    {{ item.text }} 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- footer -->
    <nampong-footer></nampong-footer>

    <v-row justify="center">
        <v-dialog
            v-model="dialog"
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
                            @click="dialog = !dialog ; readit = true">
                                <v-icon icon="mdi-close"></v-icon>
                            </div>
                        </div>

                        <v-divider></v-divider>
                    </div>
                    <div class="w-full flex flex-col px-2">
                        <div class="w-full " v-for="banner of bannerPin">
                            <div class=" w-full h-full">
                                <img :src="(banner as any).url" alt="" 
                                class="my-2 px-2 rounded-lg cursor-pointer w-full scale-100 hover:scale-[1.01] duration-500">
                            </div>
                        <v-divider></v-divider>
                        </div>

                    </div>
                </div>
            </v-card>
            </v-dialog>
    </v-row>
</template>