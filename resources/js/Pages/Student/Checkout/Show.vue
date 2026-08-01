<script setup lang="ts">
import StudentLayout from '@/Layouts/StudentLayout.vue';
import student from '@/routes/student';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowRight, BadgeCheck, CheckCircle2, CreditCard, Landmark, ShieldCheck, Tag, Wallet, X } from 'lucide-vue-next';

const props = defineProps<{
    course: any;
    methods: Array<{ id: string; name: string; icon: any }>;
}>();

const form = useForm({
    payment_method: 'local',
});

const couponCode = ref('');
const couponApplied = ref(false);
const couponDiscount = ref(0);
const couponError = ref('');
const submittingCoupon = ref(false);

const applyCoupon = async () => {
    if (!couponCode.value.trim()) return;
    submittingCoupon.value = true;
    couponError.value = '';

    try {
        const response = await axios.post(
            student.checkout.validateCoupon.url(props.course.slug),
            { code: couponCode.value.trim() }
        );

        if (response.data.valid) {
            couponApplied.value = true;
            couponDiscount.value = response.data.coupon.discount;
            couponError.value = '';
        } else {
            couponApplied.value = false;
            couponDiscount.value = 0;
            couponError.value = response.data.message;
        }
    } catch {
        couponApplied.value = false;
        couponDiscount.value = 0;
        couponError.value = 'Failed to validate coupon.';
    } finally {
        submittingCoupon.value = false;
    }
};

const removeCoupon = () => {
    couponCode.value = '';
    couponApplied.value = false;
    couponDiscount.value = 0;
    couponError.value = '';
};

const submit = () => {
    form.post(student.checkout.store({ course: props.course.id }).url);
};

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'CreditCard':
            return CreditCard;
        case 'Bank':
            return Landmark;
        case 'Wallet':
            return Wallet;
        default:
            return CreditCard;
    }
};

const getThumbnail = (path: string | null) => {
    if (!path) return 'https://images.unsplash.com/photo-1497493234204-5003666579cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
    return path.startsWith('http') ? path : `/storage/${path}`;
};
</script>

<template>
    <Head title="Checkout" />

    <StudentLayout>
        <template #header>
            <div class="no-print mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Link :href="student.courses.show({ course: props.course.slug }).url" class="transition-colors hover:text-brand-600"
                    >Course Details</Link
                >
                <span>/</span>
                <span class="font-medium text-slate-900">Checkout</span>
            </div>
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">Complete Your Purchase</h2>
        </template>

        <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <!-- Main Form -->
                <div class="space-y-6 lg:col-span-2">
                    <!-- Course Card (Mobile/Small only) -->
                    <div class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 lg:hidden">
                        <img :src="getThumbnail(course.thumbnail)" class="h-24 w-24 rounded-lg object-cover" alt="" />
                        <div>
                            <h3 class="font-bold text-slate-900">{{ course.title }}</h3>
                            <p class="text-sm text-slate-500">{{ course.category?.name }}</p>
                            <div class="mt-2 font-bold text-brand-600">${{ Number(course.effective_price).toFixed(2) }}</div>
                        </div>
                    </div>

                    <!-- Payment Method Selection -->
                    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div class="border-b border-slate-100 bg-slate-50/50 p-6">
                            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-900">
                                <CreditCard class="h-5 w-5 text-brand-600" />
                                Select Payment Method
                            </h3>
                        </div>
                        <div class="space-y-4 p-6">
                            <div
                                v-for="method in methods"
                                :key="method.id"
                                @click="form.payment_method = method.id"
                                class="group relative flex cursor-pointer items-center rounded-xl border-2 p-4 transition-all"
                                :class="
                                    form.payment_method === method.id
                                        ? 'border-brand-600 bg-brand-50/30'
                                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                                "
                            >
                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-lg"
                                    :class="
                                        form.payment_method === method.id
                                            ? 'bg-brand-100 text-brand-600'
                                            : 'bg-white text-slate-400 group-hover:text-slate-600'
                                    "
                                >
                                    <component :is="getIcon(method.icon)" class="h-6 w-6" />
                                </div>
                                <div class="ml-4 flex-1">
                                    <div class="pb-0.5 font-bold" :class="form.payment_method === method.id ? 'text-brand-900' : 'text-slate-700'">
                                        {{ method.name }}
                                    </div>
                                    <div class="text-xs text-slate-500">Secure and encoded payment processing</div>
                                </div>
                                <div
                                    class="flex h-6 w-6 items-center justify-center rounded-full border-2"
                                    :class="form.payment_method === method.id ? 'border-brand-600 bg-brand-600' : 'border-slate-200'"
                                >
                                    <div v-if="form.payment_method === method.id" class="h-2 w-2 rounded-full bg-white"></div>
                                </div>
                            </div>

                            <div v-if="form.errors.payment_method" class="text-sm font-medium text-red-600">
                                {{ form.errors.payment_method }}
                            </div>
                        </div>
                    </div>

                    <!-- Secure Notice -->
                    <div class="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 lg:hidden">
                        <ShieldCheck class="mt-0.5 h-5 w-5 text-emerald-600" />
                        <p class="text-sm leading-relaxed text-emerald-800">
                            Your payment is 100% secure. We use industry-standard encryption to protect your data.
                        </p>
                    </div>

                    <!-- Submit Button (Mobile) -->
                    <button
                        @click="submit"
                        :disabled="form.processing"
                        class="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 font-bold text-white shadow-lg shadow-brand-200 transition-all hover:bg-brand-700 active:scale-[0.98] lg:hidden"
                    >
                        <span v-if="form.processing">Processing...</span>
                        <span v-else>Pay ${{ Number(course.effective_price).toFixed(2) }} Now</span>
                        <ArrowRight v-if="!form.processing" class="h-5 w-5" />
                    </button>
                </div>

                <!-- Order Summary Sidebar -->
                <div class="space-y-6">
                    <div class="sticky top-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div class="border-b border-slate-100 bg-slate-50/50 p-6">
                            <h3 class="text-lg font-bold text-slate-900">Order Summary</h3>
                        </div>

                        <!-- Desktop Course Details -->
                        <div class="hidden border-b border-slate-100 p-6 lg:block">
                            <div class="flex gap-4">
                                <img :src="getThumbnail(course.thumbnail)" class="h-20 w-20 shrink-0 rounded-lg object-cover" alt="" />
                                <div>
                                    <h4 class="line-clamp-2 text-sm leading-tight font-bold text-slate-900">{{ course.title }}</h4>
                                    <p class="mt-1 text-xs text-slate-500">{{ course.category?.name }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4 p-6">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium text-slate-500">Course Price</span>
                                <span class="font-bold text-slate-900">${{ Number(course.price).toFixed(2) }}</span>
                            </div>
                            <div v-if="course.discount_amount > 0" class="flex justify-between text-sm">
                                <span class="font-medium text-slate-500">Discount</span>
                                <span class="font-bold text-emerald-600">-${{ Number(course.discount_amount).toFixed(2) }}</span>
                            </div>
                            <!-- Coupon Input -->
                            <div class="mt-4">
                                <div v-if="!couponApplied" class="flex gap-2">
                                    <div class="relative flex-1">
                                        <Tag class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            v-model="couponCode.value"
                                            type="text"
                                            :placeholder="__('Enter coupon code')"
                                            class="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                                        />
                                    </div>
                                    <button
                                        @click="applyCoupon"
                                        :disabled="submittingCoupon || !couponCode.value.trim()"
                                        class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
                                    >
                                        <span v-if="submittingCoupon">Applying...</span>
                                        <span v-else>Apply</span>
                                    </button>
                                </div>
                                <div v-else class="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-900/20">
                                    <div class="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                        <BadgeCheck class="h-4 w-4" />
                                        <span>Coupon applied: {{ couponCode.value }}</span>
                                        <span class="font-bold">-${{ couponDiscount.toFixed(2) }}</span>
                                    </div>
                                    <button @click="removeCoupon" class="text-slate-400 hover:text-slate-600">
                                        <X class="h-4 w-4" />
                                    </button>
                                </div>
                                <p v-if="couponError" class="mt-1 text-xs text-red-500 dark:text-red-400">
                                    {{ couponError }}
                                </p>
                            </div>

                            <div class="flex items-center justify-between border-t border-slate-100 pt-4">
                                <span class="text-lg font-bold text-slate-900">Total</span>
                                <span class="text-2xl font-black text-brand-600">
                                    ${{ couponApplied ? (Number(course.effective_price) - couponDiscount).toFixed(2) : Number(course.effective_price).toFixed(2) }}
                                </span>
                            </div>

                            <button
                                @click="submit"
                                :disabled="form.processing"
                                class="hidden h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 font-bold text-white shadow-lg shadow-brand-100 transition-all hover:bg-brand-700 active:scale-[0.98] disabled:opacity-50 lg:flex"
                            >
                                <span v-if="form.processing">Processing...</span>
                                <span v-else>Complete Purchase</span>
                                <ArrowRight v-if="!form.processing" class="h-4 w-4" />
                            </button>

                            <div class="space-y-3 pt-4">
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 class="h-4 w-4 text-emerald-500" />
                                    <span>Lifetime access to course content</span>
                                </div>
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 class="h-4 w-4 text-emerald-500" />
                                    <span>Certificate of completion included</span>
                                </div>
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 class="h-4 w-4 text-emerald-500" />
                                    <span>30-day money-back guarantee</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-center gap-2 border-t border-emerald-100 bg-emerald-50 p-4">
                            <ShieldCheck class="h-4 w-4 text-emerald-600" />
                            <span class="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StudentLayout>
</template>
