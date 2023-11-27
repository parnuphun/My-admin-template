<template>
    <div class="bg-image-container">
<div class="min-h-screen  flex justify-center items-center">

    <div class="max-w-screen-lg m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

            <div class="mt-12 flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold text-gray-600">
                    Sign up
                </h1>
                <div class="w-full flex-1 mt-8">
                    <div class="mx-auto max-w-xs">
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email" />
                        <input
                            class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" />
                        <button
                            class="mt-5 tracking-wide font-semibold bg-[#38bdf8] text-gray-100 w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                            <span class="ml-3">
                                Sign in
                            </span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 bg-[#38bdf8] text-center hidden lg:flex">
            <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat "
                style="background-image: url('src/views/Login/school.png');">
            </div>
        </div>
    </div>
    </div>
</div>
</template>
<style>
  .bg-image-container {
    height: 100vh; /* ความสูงเต็มหน้าจอ */
    background-image: url('src/views/Testnes/background.png'); /* เปลี่ยนเป็นที่อยู่ของรูปภาพของคุณ */
  }
</style>
