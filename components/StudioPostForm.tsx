'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, UploadCloud, X } from 'lucide-react';
import { useToast } from '@/components/ui/Toasts/use-toast';
import ActionButton from '@/components/ui/ActionButton';
import { createPost, type CreatePostState } from '@/app/posts/actions';

const initialState: CreatePostState = {
  status: 'idle'
};

const formatBytes = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) return '0 B';
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <ActionButton type="submit" variant="primary" size="md" disabled={pending}>
      {pending ? '게시물 저장 중...' : '게시물 작성'}
    </ActionButton>
  );
}

export default function StudioPostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const handledSuccessPostIdRef = useRef<string | null>(null);
  const [state, formAction] = useFormState(createPost, initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageInputKey, setImageInputKey] = useState(0);

  const imagePreviewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );

  useEffect(() => {
    if (!imagePreviewUrl) return;
    return () => URL.revokeObjectURL(imagePreviewUrl);
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (state.status === 'success') {
      const postId = state.postId?.trim() || '';
      if (postId && handledSuccessPostIdRef.current === postId) {
        return;
      }
      handledSuccessPostIdRef.current = postId || '__handled__';

      toast({
        title: '작성 완료',
        description: '사진 게시물이 등록되었습니다.'
      });

      formRef.current?.reset();
      setImageFile(null);
      setImageInputKey((prev) => prev + 1);
      router.refresh();
      return;
    }

    if (state.status === 'error' && state.message) {
      handledSuccessPostIdRef.current = null;
      toast({
        title: '작성 실패',
        description: state.message
      });
    }
  }, [router, state, toast]);

  return (
    <form
      ref={formRef}
      action={formAction}
      encType="multipart/form-data"
      className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.45)] md:p-6"
    >
      <input type="hidden" name="required_membership_level" value="0" />

      <div className="mb-5 rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">
          Studio Creator Upload
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
          사진 게시물 작성
        </h3>
        <p className="mt-2 text-sm text-white/60">
          제목, 내용, 대표 사진 한 장만 등록하면 된다.
        </p>
      </div>

      {state.status === 'error' && state.message && (
        <div className="mb-5 flex items-start gap-2 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      <div className="space-y-5">
        <section className="rounded-3xl border border-white/10 bg-black/25 p-4 md:p-5">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              1. 게시글 정보
            </p>
            <p className="mt-1 text-sm text-white/65">
              회사 소개용 사진 게시물이라 제목과 내용만 깔끔하게 적으면 된다.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label
                htmlFor="studio-post-title"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55"
              >
                제목
              </label>
              <input
                id="studio-post-title"
                name="title"
                maxLength={80}
                required
                placeholder="예) 제우스 메인 레코딩 룸"
                className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/[0.09]"
              />
              {state.status === 'error' && state.fieldErrors?.title && (
                <p className="text-sm text-red-200">{state.fieldErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="studio-post-content"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55"
              >
                내용
              </label>
              <textarea
                id="studio-post-content"
                name="content"
                required
                maxLength={2000}
                rows={6}
                placeholder="공간 소개, 장비 설명, 작업 특징 같은 내용을 적어주면 된다."
                className="w-full resize-y rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/[0.09]"
              />
              {state.status === 'error' && state.fieldErrors?.content && (
                <p className="text-sm text-red-200">{state.fieldErrors.content}</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/25 p-4 md:p-5">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              2. 대표 사진
            </p>
            <p className="mt-1 text-sm text-white/65">
              이미지 한 장만 올리면 된다. 영상, 멤버십, R2 설정은 다 뺐다.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">썸네일 이미지</p>
              {imageFile ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-100">
                  <CheckCircle2 className="h-3 w-3" />
                  선택됨
                </span>
              ) : null}
            </div>

            <input
              key={imageInputKey}
              id="studio-post-image-upload"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="sr-only"
            />

            <label
              htmlFor="studio-post-image-upload"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <UploadCloud className="h-4 w-4" />
              사진 선택
            </label>

            <p className="mt-2 text-xs text-white/55">
              {imageFile
                ? `${imageFile.name} · ${formatBytes(imageFile.size)}`
                : '최대 5MB, JPG/PNG/WebP'}
            </p>

            {imageFile ? (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImageInputKey((prev) => prev + 1);
                }}
                className="mt-2 inline-flex items-center gap-1 text-xs text-white/65 underline underline-offset-2 hover:text-white"
              >
                <X className="h-3 w-3" />
                이미지 선택 해제
              </button>
            ) : null}

            {state.status === 'error' && state.fieldErrors?.image && (
              <p className="mt-2 text-sm text-red-200">{state.fieldErrors.image}</p>
            )}

            {imagePreviewUrl ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img
                  src={imagePreviewUrl}
                  alt="선택한 대표 이미지 미리보기"
                  className="h-[260px] w-full object-cover"
                />
              </div>
            ) : (
              <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center">
                <p className="text-sm leading-relaxed text-white/50">
                  사진을 고르면 여기에 미리보기가 뜬다.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
