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

    function getCurrentPath(url:string){
        router.push(url)
    }
    const tab = ref<string>('option-1')

    const imageGallery = ref<Array<imageGalleryType>>([
        {
            text:`วันที่ ๒๓ พฤศจิกายน ๒๕๖๖
นายเทพนคร   นามวงษ์  ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เป็นประธานพิธีวางพวงมาลาถวายราชสดุดี และถวายบังคมพระราชานุสาวรีย์ พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว เนื่องในวันสมเด็จพระมหาธีรราชเจ้า หรือวันคล้ายวันสวรรคตของพระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว ซึ่งตรงกับวันที่ ๒๕ พฤศจิกายน ของทุกปี 
การจัดกิจกรรมในครั้งนี้มีผู้กำกับลูกเสือ และลูกเสือเนตรนารีโรงเรียนเทศบาลน้ำพองภูริพัฒน์เข้าร่วมพิธี ณ ลานพระบรมราชานุสาวรีย์พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว โรงเรียนเทศบาลน้ำพองภูริพัฒน์`,
            url:'https://scontent.fbkk13-3.fna.fbcdn.net/v/t39.30808-6/405519695_840931067824828_9125317074136614365_n.jpg?stp=dst-jpg_p600x600&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHgZSRqqBkVzWMiXubPMcQDZ2fYtIdL60dnZ9i0h0vrRy19LMa5y1NKXFhDKibhAPgRfVt7GqqG-kBCjfpG8myt&_nc_ohc=to-Ii5UInlsAX-doSpM&_nc_ht=scontent.fbkk13-3.fna&oh=00_AfApniFCCifcg999IaI7OWbcEKvI7GSS4s8-OuPqa8cc8A&oe=6564A7EB'
        },
        {
            text:`(ภาพชุดที่ ๗)
วันที่ ๑๗ พฤศจิกายน ๒๕๖๖
ผู้บริหาร คณะครู บุคลากรทางการศึกษา และผู้ปกครองนักเรียน นำนักเรียนเข้าร่วมแข่งขันกีฬากลุ่มมิตรภาพลุมน้ำพอง ครั้งที่ ๗ ณ โรงเรียนเทศบาลกุดน้ำใส อำเภอน้ำพอง จังหวัดขอนแก่น`,
            url:'https://scontent.fbkk12-2.fna.fbcdn.net/v/t39.30808-6/402101419_837791614805440_2051638660450020868_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHGozCLoVGXhxtELJVSFGVST0juWLreSupPSO5Yut5K6n12huejtLTpZnu4zPfUSzt6bsmxIPV4q1k3QJePEt26&_nc_ohc=0lU-B3DTXl8AX-XqeeR&_nc_ht=scontent.fbkk12-2.fna&oh=00_AfDAnhNOyjz_JQ3ZgzY_kJumj3NECDZzeG62LX_HV2GFiA&oe=65655C25'
        },
        {
            text:`(ภาพชุดที่ ๕)
วันที่ ๑๗ พฤศจิกายน ๒๕๖๖
ผู้บริหาร คณะครู บุคลากรทางการศึกษา และผู้ปกครองนักเรียน นำนักเรียนเข้าร่วมแข่งขันกีฬากลุ่มมิตรภาพลุมน้ำพอง ครั้งที่ ๗ ณ โรงเรียนเทศบาลกุดน้ำใส อำเภอน้ำพอง จังหวัดขอนแก่น`,
            url:'https://scontent.fbkk8-4.fna.fbcdn.net/v/t39.30808-6/402067733_837763754808226_3500308249080061856_n.jpg?stp=dst-jpg_p600x600&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEa9o0VHNLBZ5HHcptw4oAKdbRPexRwVd11tE97FHBV3ZZGkYhnKcj1ws9L0weEFJYEhVqyMuwImf3QelJ218Ys&_nc_ohc=Jl_t3BKc74MAX9fAsaF&_nc_ht=scontent.fbkk8-4.fna&oh=00_AfAv3KvT0q5Tq7ZVjkyEF0Zma_virt4V6ErgPHK4O7QY8Q&oe=656536A9'
        },
        {
            text:`(ภาพชุดที่ ๔)
วันที่ ๑๗ พฤศจิกายน ๒๕๖๖
ผู้บริหาร คณะครู บุคลากรทางการศึกษา และผู้ปกครองนักเรียน นำนักเรียนเข้าร่วมแข่งขันกีฬากลุ่มมิตรภาพลุมน้ำพอง ครั้งที่ ๗ ณ โรงเรียนเทศบาลกุดน้ำใส อำเภอน้ำพอง จังหวัดขอนแก่น`,
            url:'https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/402027489_837759618141973_2145396600763293133_n.jpg?stp=dst-jpg_p600x600&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFHzDD2JhPBq6BSfVxjDLJeCZtjrUhdIPYJm2OtSF0g9pO31Tfy3R5qdEOl81n9phl8O5UJ4P61NB0Q1v-ztVA0&_nc_ohc=M2Qwd5aCvHMAX_XM_uu&_nc_ht=scontent.fbkk8-2.fna&oh=00_AfB8YEhDq3OLMGvfCM5J-pUv8eRmJErzcLuR5fgnmEzTlw&oe=6565ACFF'
        },
        {
            text:`(ภาพชุดที่ ๓)
วันที่ ๑๗ พฤศจิกายน ๒๕๖๖
ผู้บริหาร คณะครู บุคลากรทางการศึกษา และผู้ปกครองนักเรียน นำนักเรียนเข้าร่วมแข่งขันกีฬากลุ่มมิตรภาพลุมน้ำพอง ครั้งที่ ๗ ณ โรงเรียนเทศบาลกุดน้ำใส อำเภอน้ำพอง จังหวัดขอนแก่น`,
            url:'https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/402096718_837753888142546_112098599970642128_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFhSQeRTzMyjLfEZJgHuU4kHt8Bf05-yJUe3wF_Tn7IlWzmD5t_HgAZmpSaDvZOuZN7wwCtDhfG5OcBOiQHrsGP&_nc_ohc=grG74c5ae68AX8AlS8m&_nc_ht=scontent.fbkk8-2.fna&oh=00_AfCSYWpBr6lw1zbKbYtoT8-kQLJYCvIxs_r3rosnJHNu8g&oe=6564D5AA'
        },
        {
            text:`(ภาพชุดที่ ๒)
วันที่ ๑๗ พฤศจิกายน ๒๕๖๖
ผู้บริหาร คณะครู บุคลากรทางการศึกษา และผู้ปกครองนักเรียน นำนักเรียนเข้าร่วมแข่งขันกีฬากลุ่มมิตรภาพลุมน้ำพอง ครั้งที่ ๗ ณ โรงเรียนเทศบาลกุดน้ำใส อำเภอน้ำพอง จังหวัดขอนแก่น`,
            url:'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/401848708_837743721476896_8670774879012834010_n.jpg?stp=dst-jpg_p600x600&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFHqvJAe2T_5p_kEh9UIKiIX4vzIVlA4hdfi_MhWUDiF3OklfvVImQlW8abbN_pj3DD75nMjFwDSMnhvrNgrdm_&_nc_ohc=Z9HLR6X0mWgAX8G9U12&_nc_ht=scontent.fbkk12-1.fna&oh=00_AfCS0FuiLj8gv4_xeFIxVfcA6F8-AvhxVa8EzfPqs1LwAA&oe=65654BB8'
        },
        {
            text:`(ภาพชุดที่ ๑)
วันที่ ๑๗ พฤศจิกายน ๒๕๖๖
ผู้บริหาร คณะครู บุคลากรทางการศึกษา และผู้ปกครองนักเรียน นำนักเรียนเข้าร่วมแข่งขันกีฬากลุ่มมิตรภาพลุมน้ำพอง ครั้งที่ ๗ ณ โรงเรียนเทศบาลกุดน้ำใส อำเภอน้ำพอง จังหวัดขอนแก่น`,
            url:'https://scontent.fbkk12-2.fna.fbcdn.net/v/t39.30808-6/402107270_837739528143982_1160430569608916923_n.jpg?stp=dst-jpg_p600x600&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEI7akaJx753Wv4woGa6MT9Qed9grUYc3ZB532CtRhzdv75Q4rRMV8Shzmk1SooDkaPtZtUko3f5iuqvP94Nmxc&_nc_ohc=iE0AJIrMf-wAX-O_ItI&_nc_ht=scontent.fbkk12-2.fna&oh=00_AfA-8cYRO2n9MVRzczm6hMs5jRu5aylBD4ePw8i1RzamAg&oe=6565303C'
        },
        {
            text:`#ภาพการซ้อมเดินพาเหรด
เพื่อเตรียมพร้อมสำหรับการเข้าร่วมแข่งขันกีฬามิตรภาพลุ่มน้ำพองประจำปี ๒๕๖๖ ในวันที่ ๑๗ พฤศจิกายน ๒๕๖๖`,
            url:'https://scontent.fbkk12-5.fna.fbcdn.net/v/t39.30808-6/401833546_836876844896917_3172360024746192826_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGD2Rso47be5fkqMb4SOv2AdH2BmsnghQ50fYGayeCFDgtLypjo1T2_OI9oiAzvkKT7sJsrhboHgfQ-Gu1PUzNg&_nc_ohc=iSW3xhsLduoAX8mP9nb&_nc_ht=scontent.fbkk12-5.fna&oh=00_AfCJHgwYprfx4voaOv1hiKRgjH2zpuz16tGnAdZZ7meo5Q&oe=6566460E'
        },
    ]
    )

    const bannerPin = ref<Array<Object>>([
        {
            url:'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=vjLhdMVptO0AX9DTtqY&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfCRsTOKsxeZ9pQn7CjzanI9eSOcxnvxmQlrhGfNCbl8Zg&oe=6564FD9F',
        },
        {
            url:'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=vjLhdMVptO0AX9DTtqY&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfCRsTOKsxeZ9pQn7CjzanI9eSOcxnvxmQlrhGfNCbl8Zg&oe=6564FD9F',
        },
        {
            url:'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=vjLhdMVptO0AX9DTtqY&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfCRsTOKsxeZ9pQn7CjzanI9eSOcxnvxmQlrhGfNCbl8Zg&oe=6564FD9F',
        },
        {
            url:'https://scontent.fbkk13-2.fna.fbcdn.net/v/t39.30808-6/333400689_1243700996222458_7424500479593884419_n.jpg?stp=dst-jpg_p960x960&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFemNuw4tHnZVcMdMTzvV33K_M69buS9akr8zr1u5L1qSKPLpyeC5z5r5t6785lSGfoBv21ql6fcv8jX5nsiZgU&_nc_ohc=vjLhdMVptO0AX9DTtqY&_nc_ht=scontent.fbkk13-2.fna&oh=00_AfCRsTOKsxeZ9pQn7CjzanI9eSOcxnvxmQlrhGfNCbl8Zg&oe=6564FD9F',
        },
    ])


    const newRelase = ref<Array<Object>>([        
        {
            title:'งานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#ขอเชิญชม การแสดงวงโปงลางอีสานภูริพัฒน์ศิลป์ โรงเรียนเทศบาลน้ำพองภูริพัฒน์ ในงานเทศกาลลอยกระทงเทศบาลตำบลน้ำพอง  ณ  ท่าเทียบเรือหนองหวาย ในวันที่ 27 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/404925905_840352024549399_2114780980272238387_n.jpg?stp=dst-jpg_p843x403&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJfNTo9TIX-gDGzJ_N4MlF1BGHi-ciH6fUEYeL5yIfp-YqYzW-Tevo_ZwWKkbN2DlJPakENcGsAbl4AbfTa2Q3&_nc_ohc=xtiN3kZCCr8AX9X7JRC&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCNqvYHL-266EOE1Lra8K5bsmaMAEzsd3F-Rud-zQPTYg&oe=6566C825',
        },
        {
            title:'การแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้น ',
            date:'26 พฤศจิกายน 2566',
            description:`#ขอเชิญร่วมชมและเชียร์
ทีมฟุตบอลโรงเรียนเทศบาลน้ำพองภูริพัฒน์ในการแข่งขันฟุตบอลการไฟฟ้าฯ ณ โรงเรียนบ้านห้วยเสือเต้นตำบลน้ำพองอำเภอน้ำพองจังหวัดขอนแก่น  ระหว่างวันที่ 1-12 พฤศจิกายน 2566`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/401074028_833968698521065_2274648922490442338_n.jpg?stp=dst-jpg_p843x403&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGn74tnpkhYYeu1tHnzLuzyFodigpZMPP0Wh2KClkw8_bmpQjoIEWrEwfMES6gw7U76XOC6YFa0DVNi_cGDPxvu&_nc_ohc=OtA_fAHBrZMAX8PyEbK&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCiqVoTchopArIoDA72Ww6XS_KNjO3NQg3BmPjZEFP-Gw&oe=65668E19'
        },
        {
            title:'ประกาศเปิดเทอมภาคเรียนที่ 2 ',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/397895158_828144389103496_8407568675394802648_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGytcZnZEaG-Zfph2-fdjEYKXjb7Ipxro4peNvsinGujp7RWXblvutW0NHY5UAnMrHMn4PLt1Tf4rZuUXoFyIic&_nc_ohc=jMNpx-3t6XAAX_k3oP6&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCUCrKRqKdgDu_4V5b2HjKuN5ypZSMZj7Tn2qJYAQgY7g&oe=6566DCDB'
        },
        {
            title:'ผู้อำนวยการสถานศึกษาเชี่ยวชาญ ในโอกาสที่ย้ายมาดำรงตำแหน่ง ผู้อำนวยการสถานศึกษา ',
            date:'26 พฤศจิกายน 2566',
            description:`วันที่ ๗ ตุลาคม ๒๕๖๖
ผู้บริหารเทศบาลตำบลน้ำพอง คณะกรรมการสถานศึกษาขั้นพื้นฐาน ครู บุคลากรทางการศึกษา นักเรียนและผู้ปกครองโรงเรียนเทศบาลน้ำพองภูริพัฒน์ ให้การต้อนรับ และแสดงความยินดีกับ นายเทพนคร  นามวงษ์  ตำแหน่ง ผู้อำนวยการสถานศึกษา วิทยฐานะ ผู้อำนวยการสถานศึกษาเชี่ยวชาญ ในโอกาสที่ย้ายมาดำรงตำแหน่ง ผู้อำนวยการสถานศึกษา โรงเรียนเทศบาลน้ำพองภูริพัฒน์ 
#โรงเรียนเทศบาลน้ำพองภูริพัฒน์
#สังกัดเทศบาลตำบลน้ำพอง`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/386512026_814531057131496_4379709893718073259_n.jpg?stp=dst-jpg_p600x600&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGv5fSTIQ54eHWDi37U7tqyOMTBeYEG1Es4xMF5gQbUS0Xp7C3p1qXTtUy87sJ-2nlzjK4y9NRO_391faZCxdPv&_nc_ohc=egrJejoJ0ocAX-m-Dtv&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDHRIsY3YDIyjXAAEMKM7_bfUqWDhWrKjXu-LmbDSpacA&oe=65676CB7'
        },
        {
            title:'กิจกรรมประชุมผู้ปกครองประจำภาคเรียนที่ ๑ ปีการศึกษา ๒๕๖๖  ',
            date:'26 พฤศจิกายน 2566',
            description:`โรงเรียนเทศบาลน้ำพองภูริพัฒน์ เรียนเชิญผู้ปกครองนักเรียนร่วมกิจกรรมประชุมผู้ปกครองประจำภาคเรียนที่ ๑ ปีการศึกษา ๒๕๖๖ ในวันที่ ๒๕ มิถุนายน ๒๕๖๖ ณโรงเรียนเทศบาลน้ำพองภูริพัฒน์  เวลา ๐๙.๐๐ น. - ๑๒.๐๐ น.
ขอความกรุณาผู้ปกครองนำใบเสร็จรับเงินมารับค่าเครื่องแบบนักเรียน และค่าอุปกรณ์การเรียนดังนี้
🌟ระดับอนุบาล
           ✳️ค่าเครื่องแบบนักเรียน 325 บาท
           ✳️ค่าอุปกรณ์การเรียน 145 บาท
🌟ระดับประถมศึกษา 
           ✳️ค่าเครื่องแบบนักเรียน 400 บาท
           ✳️ค่าอุปกรณ์การเรียน    220 บาท
และนำสำเนาบัตรประจำตัวประชาชนของผู้ปกครองและของนักเรียนมาด้วยนะครับ`,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/356219678_757258679525401_7384937705460787692_n.jpg?stp=dst-jpg_p843x403&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFkVrVYM4dgRCQ8u2sjZASuPYY8TsyazCQ9hjxOzJrMJHmcQK1Qx45CsromLr0bLxOZKWSJ28vItZQh9r2jlCXV&_nc_ohc=oHrVx3P4CCgAX8akGy6&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCVk6oVjDeS6Wpu4-yLE3HKccTSDUB82Yp4y5Jodb6ttQ&oe=65672E53'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
        {
            title:'ขอเชิญร่วมเข้าแข่งขันเดิน-วิ่งหนองหวายมินิมาราธอน สมัครได้แล้ววันนี้',
            date:'26 พฤศจิกายน 2566',
            description:``,
            src:'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/315482159_614748597109744_3843689068979621714_n.jpg?stp=dst-jpg_p843x403&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE69TFOAHzZIjd9xvlvSZmmoJBzKbdkrEugkHMpt2SsS9TGac6PH_vNs3BbZlLKqp62Z0BQuNERde45IVH3RMfE&_nc_ohc=fzCtgOlUHloAX8NntBp&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfAJsCTyY1S9NmVYlFXjaHnork8GMEGOB2Vjp0CHfnw1_w&oe=656637E7'
        },
    ])
</script>

<template>

    <div class="flex flex-col w-full relative">
        <div @click="dialog = !dialog"
        class="mb-8 mr-8 fixed h-20 w-20 rounded-full bg-pink-50 bottom-0 right-0 bg border-4 border-pink-500
         hover:bg-pink-500 text-3xl cursor-pointer flex justify-center items-center duration-500">
            📢
        </div>
        <NampongNavBar></NampongNavBar>

        <!-- Banner -->
        <div class="w-full h-[auto] max-h-[600px] bg-gradient-to-tr flex justify-center items-start z-10" >
            <!-- <v-carousel height="500" :hide-delimiters="true" cycle show-arrows="hover" progress="pink" class="max-h-[600px]" >
                <template v-slot:prev="{ props }">
                    <div class="text-white hover:text-pink-300 text-7xl h-full w-96
                                flex items-center justify-start cursor-pointer -ml-9 opacity-0 hover:opacity-100
                                hover:bg-gradient-to-r from-pink-100 transition duration-700 ease-in-out"
                                @click="props.onClick">
                        <v-icon class="" end icon="mdi-chevron-left"></v-icon>
                    </div>
                </template>
                <template v-slot:next="{ props }">
                    <div class="text-white hover:text-pink-300 text-7xl h-full w-96
                                flex items-center justify-end cursor-pointer -mr-9 opacity-0 hover:opacity-100
                                hover:bg-gradient-to-l from-pink-100 md:bg-none transition duration-700 ease-in-out"
                                @click="props.onClick">
                        <v-icon class="" end icon="mdi-chevron-right"></v-icon>
                    </div>
                </template>
                <v-carousel-item
                src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=VpfoULMTWzoAX_A2xle&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCSxxy_Dj17Q5h9eOy_VX82fqAjkLFGsvYBeGShQq1edg&oe=65651641"
                cover
                ></v-carousel-item>

                <v-carousel-item
                src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t31.18172-8/17218424_1898961647053178_1412965025588056456_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=300f58&_nc_eui2=AeHngEUVwuY6EmjMb6FkB4JjJyc6-wQl2TcnJzr7BCXZN_q4JOmNqeZ5rFgOLtUPrx64iPjm99-zIQcrzO-hN4vG&_nc_ohc=1z95Oh3lsQgAX-QIyWl&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfDy9d7R-6dUd0b44zhZr3GlhnQSp9eCFcdPOrXPwpl_dw&oe=6587394E"
                cover
                ></v-carousel-item>

                <v-carousel-item
                src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/305080963_598372432080694_4418128457966245529_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFlOlKISoxHGEtEixh8iTsL2guWTnFxDrraC5ZOcXEOuqMwwrQM3XDAmLl7JQb4DyifrYDNnDqKHA_-RkhnYVW5&_nc_ohc=jYkBowg8lLMAX8k5qQV&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfBbeqiMnL1VYSoHwOPZm9jHQgqRjcbGraOU7jhdCv43tA&oe=65647FFD"
                cover
                ></v-carousel-item>
            </v-carousel> -->
            <v-parallax height="500" 
                src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/359126743_767479011836701_6209240523584219004_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFuk1W62vTaSwE9MlblRf4IUJW-gXoWk8lQlb6BehaTyZRlxeJcruJAp9KhQby6dJlFaM_pBWKKR4jlwYfgOMqx&_nc_ohc=VpfoULMTWzoAX_A2xle&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCSxxy_Dj17Q5h9eOy_VX82fqAjkLFGsvYBeGShQq1edg&oe=65651641">
                    <div class="relative w-full h-full flex justify-center items-center bg-black opacity-30"></div>
                    <div class="absolute w-full h-full flex justify-center items-center top-0">
                        <p class="text-3xl md:text-5xl lg:text-6xl text-white font-bold">
                            “ คนดี มีวินัย ใฝ่คุณธรรม เลิศล้ำวิชาการ ”
                        </p>
                    </div>
            </v-parallax>
        </div>

        <!-- main meny -->
        <div class="w-full h-auto p-10 flex justify-center">
            <div class="w-[1200px] h-auto flex flex-col bg-white">
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-xl"> 
                        <v-icon icon="mdi-newspaper" class="mr-3"></v-icon> ข่าวประชาสัมพันธ์
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-xl"> 
                        <v-icon icon="mdi-account" class="mr-3"></v-icon> บุคลากรของเรา
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-xl"> 
                        <v-icon icon="mdi-file" class="mr-3"></v-icon> เอกสาร
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-xl"> 
                        <v-icon icon="mdi-image" class="mr-3"></v-icon> ภาพกิจกรรม
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-xl"> 
                        <v-icon icon="mdi-information" class="mr-3"></v-icon> เกี่ยวกับเรา
                    </div>
                    <div class="w-1/3 min-w-[300px] h-[100px] hover:bg-pink-500 duration-500
                    text-pink-500 hover:text-white text-2xl hover:text-3xl flex justify-center 
                    items-center cursor-pointer px-3 shadow-xl"> 
                        <v-icon icon="mdi-phone" class="mr-3"></v-icon> ติดต่อเรา
                    </div>
                </div>
            </div>
        </div>

        <!-- image gallery -->
        <div class="w-full h-auto bg-white pb-4 flex justify-center">
            <div class="w-[1200px] h-auto flex flex-col justify-center items-center ">
                <div class="w-max bg-white h-auto pt-6 pb-4 mb-4 text-3xl text-center text-pink-500">
                    <div class="text-center text-pink-500 w-max h-full">
                        <!-- <v-icon end icon="mdi-image"></v-icon> ภาพกิจกรรม -->
                        ~ ภาพกิจกรรมบางส่วนจากทางโรงเรียน ~
                    </div>
                </div>

                <div class="w-full">
                    <div class="w-full h-auto flex flex-wrap justify-between items-center">
                        <div class="w-full h-full flex flex-wrap justify-center items-center pb-4">
                            <div v-for="item of imageGallery" class="relative group w-1/4 h-[250px] cursur-pointer px-1 mt-2 ">
                                <img class="object-cover w-full h-[250px] scale-100 group-hover:scale-[1.01] duration-500
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

        <!-- Annoucement -->
        <!-- <div class="w-full h-auto  flex flex-col justify-center items-center bg-white">
            <div class="w-full h-auto pt-6 pb-4 bg-pink-500 text-2xl text-center text-white">
                    <v-icon end icon="mdi-pin"></v-icon> ประกาศจากทางโรงเรียน
            </div>
            <div class="w-[1000px] h-auto flex flex-col justify-start items-center py-2">
                <div class="w-[1000px] xl:w-[1000px] h-auto max-h-[600px] bg-gradient-to-tr relative flex justify-center items-start z-10" >
                    <v-carousel 
                        height="500" 
                        cycle 
                        show-arrows="hover" 
                        class="max-h-[600px] rounded-lg" 
                        color="white"
                        delimiter-icon="mdi-square"
                    >
                    <template v-slot:prev="{ props }">
                        <div class="text-pink-500 hover:text-pink-500 text-7xl h-full w-40
                                    flex items-center justify-start cursor-pointer -ml-9 opacity-0 hover:opacity-100
                                    transition duration-700 ease-in-out"
                                    @click="props.onClick">
                            <v-icon class="" end icon="mdi-chevron-left"></v-icon>
                        </div>
                    </template>
                    <template v-slot:next="{ props }">
                        <div class="text-pink-500 hover:text-pink-500 text-7xl h-full w-40
                                    flex items-center justify-end cursor-pointer -mr-9 opacity-0 hover:opacity-100
                                    md:bg-none transition duration-700 ease-in-out"
                                    @click="props.onClick">
                            <v-icon class="" end icon="mdi-chevron-right"></v-icon>
                        </div>
                    </template>
                        <v-carousel-item v-for="pin of bannerPin" color="white" >
                            <div class="w-full h-full bg-pink-300 flex justify-center item-center cursor-pointer" >
                                <img class="object-cover "
                                    :src="(pin as any).url" alt="">
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>
 
            </div>
        </div> -->

        <!-- news  -->
        <!-- <div class="w-full h-auto flex flex-col items-center bg-pink-100 ">
            <div class="w-full h-auto pt-6 pb-4 bg-pink-500 text-2xl text-center text-white">
                <v-icon end icon="mdi-newspaper"></v-icon> ข่าวประชาสัมพันธ์
            </div>
            <div class=" 
                    lg:w-auto xl:w-[1000px] 
                    h-auto flex justify-center items-center">
                <div class="w-full h-auto flex flex-wrap gap-8 justify-center items-center pt-4" >
                     <div v-for="item of newRelase"
                        class="w-[300px] h-[380px] bg-white rounded-md flex flex-col shadow-xl
                        scale-100 hover:scale-[1.01] duration-500 group cursor-pointer">
                        <div class="w-full h-[200px] group-hover:brightness-[0.5] duration-500" >
                            <img
                            class="object-cover w-full h-full rounded-t-md" 
                            :src="(item as any).src" alt="image">
                        </div>
                        <div class="w-full p-3">
                            <p class="line-clamp-1 text-lg">{{ (item as any).title }}</p>
                        </div>
                        <div class="w-full px-2">
                            <p class="text-sm text-gray-400">{{ (item as any).date }}</p>
                        </div>
                        <div class="w-full h-full p-3">
                            <p class="line-clamp-3" v-if="(item as any).description !== ''">
                                {{ (item as any).description }}
                            </p>
                            <p class="line-clamp-3 text-gray-400" v-else>
                                -- ไม่มีคำอธิบายเพิ่มเติม --
                            </p>
                        </div>
                     </div>
                </div>
            </div>
            <div class="w-full flex justify-center items-center py-4 ">
                <div @click="getCurrentPath('/news')" 
                class="bg-pink-500 hover:bg-pink-400 duration-500 p-3 rounded-full text-white text-xl cursor-pointer px-6">
                    ข่าวทั้งหมด
                </div>
            </div>
        </div> -->
 
        <!-- statistic -->
        <!-- <div class="w-full h-auto bg-pink-300">
            <div class="w-full h-auto flex flex-col justify-center items-center ">
                <div class="w-[1000px] h-auto pt-6 pb-4 text-2xl text-center text-white">
                    ข้อมูล สถิติ
                </div>
                
                <div class="w-full">
                    <div class="w-full h-[250px] flex flex-wrap justify-between items-center">
                        <div class="w-full h-full flex flex-row justify-center items-center p-6 gap-7">
                            <div class="w-[300px] hover:shadow-xl h-full bg-white rounded-xl flex flex-col justify-center items-center">
                                <count-up 
                                    :start-val="0" 
                                    :end-val="1"  
                                    duration="1"
                                    class="text-5xl text-pink-500">
                                </count-up>
                                <div class="text-xl text-pink-500">
                                    ผู้บริหาร
                                </div>
                            </div>
                            <div class="w-[300px] hover:shadow-xl h-full bg-white rounded-xl flex flex-col justify-center items-center">
                                <count-up 
                                    :start-val="0" 
                                    :end-val="30"  
                                    duration="5"
                                    class="text-5xl text-pink-500">
                                </count-up>
                                <div class="text-xl text-pink-500">
                                    ครูและบุคลากร
                                </div>
                            </div>
                            <div class="w-[300px] hover:shadow-xl h-full bg-white rounded-xl flex flex-col justify-center items-center">
                                <count-up 
                                    :start-val="0" 
                                    :end-val="366"  
                                    duration="5"
                                    class="text-5xl text-pink-500">
                                </count-up>
                                <div class="text-xl text-pink-500">
                                    จำนวนนักเรียน
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>

    <!-- footer -->
    <nampong-footer></nampong-footer>

    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            width="1000"
        >
            <v-card>
                <div class="w-full h-auto">
                    <div class="w-full text-center py-10 text-2xl bg-pink-500 text-white flex justify-center items-center">
                        <div class="text-4xl">
                            ประกาศจากทางโรงเรียน
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <div class="w-full" v-for="banner of bannerPin">
                            <img :src="(banner as any).url" alt="" class="mt-2 px-2 rounded-lg">
                        </div>
                    </div>
                </div>
            </v-card>
            </v-dialog>
        </v-row>
</template>