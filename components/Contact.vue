<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const googleScriptURL = 'https://script.google.com/macros/s/AKfycbwNho6p_vWrsnUyhPtBPWNTM2XsR8QAqY9o8iBmXoQ_cXidof5blmEe5xlZKd43h1AH/exec';

const schema = z.object({
    name: z.string().min(2, 'Must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    topic: z.string().nonempty('Please select a topic'),
    message: z.string().min(10, 'Must be at least 10 characters'),
});

const topics = ['Mentoring', 'Consulting', 'Project', 'Emplyoment'];

type Schema = z.output<typeof schema>;

const state: Ref<Schema> = ref({
    name: '',
    email: '',
    topic: topics[0],
    message: ''
});

const inTransit = ref(false);

const submitted = ref(false);

const toast = useToast();

function clearForm() {
    state.value.name = '';
    state.value.email = '';
    state.value.topic = topics[0];
    state.value.message = '';
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        inTransit.value = true;
        console.log('Submitting form', state.value);
        await fetch(googleScriptURL, {
            method: 'POST',
            body: JSON.stringify(state.value),
        });
        toast.add({
            title: 'Form submitted successfully!',
            icon: 'i-heroicons-check-badge',
            color: 'green'
        });
        submitted.value = true;
        clearForm();
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
            <UInput v-model="state.name" :loading="inTransit" :disabled="inTransit || submitted" placeholder="Name" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" :loading="inTransit" :disabled="inTransit || submitted"
                placeholder="ANewFriend@example.com" />
        </UFormGroup>

        <UFormGroup label="Topic" name="topic">
            <USelect v-model="state.topic" :options="topics" :loading="inTransit" :disabled="inTransit || submitted" />
        </UFormGroup>

        <UFormGroup label=" Message" name="message">
            <UTextarea v-model="state.message" :disabled="inTransit || submitted"
                placeholder="Please share how I can help you today!" />
        </UFormGroup>

        <div class="flex items-center gap-5">
            <UButton type="submit" :loading="inTransit" :color="submitted ? 'green' : 'primary'"
                :icon="submitted ? 'i-heroicons-check-badge' : ''" :disabled="submitted">
                {{ submitted ? 'Submitted' : 'Submit' }}
            </UButton>
            <span v-if="submitted"><strong>Thanks!</strong> Talk to you soon!</span>
        </div>
    </UForm>
</template>
