<script setup lang="ts">
import { z } from 'zod'
import type { Form, FormSubmitEvent } from '#ui/types'

// AKfycbz4S-GYLLgaGiqhhLb_FMHzFBYvpbUykDtbgEwsQCkbsHZ2p7mFpY-IKL2RHK_oynd3_w
// https://script.google.com/macros/s/AKfycbz4S-GYLLgaGiqhhLb_FMHzFBYvpbUykDtbgEwsQCkbsHZ2p7mFpY-IKL2RHK_oynd3_w/exec
// https://script.google.com/macros/library/d/1nrT8fXdqDLaC7ZIAA3k4SmxRrRRlhJb6cjjXfFx7ap-SXTEVLLRwxIc5/1

const googleScriptURL = 'https://script.google.com/macros/s/AKfycbz4S-GYLLgaGiqhhLb_FMHzFBYvpbUykDtbgEwsQCkbsHZ2p7mFpY-IKL2RHK_oynd3_w/exec';

const schema = z.object({
    name: z.string().min(2, 'Must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    message: z.string().min(10, 'Must be at least 10 characters')
})

type Schema = z.output<typeof schema>;

const state = reactive({
    name: undefined,
    email: undefined,
    message: undefined
})

const inTransit = ref(false);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        inTransit.value = true;
        await fetch(googleScriptURL, {
            method: 'POST',
            body: JSON.stringify(undefined)
        });
        toast.add({
            title: 'Form submitted successfully!',
            icon: 'i-heroicons-check-badge',
            color: 'green'
        });
    } catch (error) {
        console.error(error);
        toast.add({
            title: 'An error occurred while submitting the form.',
            icon: 'i-heroicons-x-circle',
            color: 'red'
        });
    } finally {
        inTransit.value = false;
    }
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" :loading="inTransit" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" :loading="inTransit" />
        </UFormGroup>

        <UFormGroup label="Message" name="message">
            <UTextarea v-model="state.message" :loading="inTransit" />
        </UFormGroup>

        <UButton type="submit" :loading="inTransit">
            Submit
        </UButton>
    </UForm>
</template>
