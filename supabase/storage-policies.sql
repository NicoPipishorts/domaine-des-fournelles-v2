-- Remplacez 'wines' si votre bucket porte un autre nom.

drop policy if exists "Authenticated can upload wine images" on storage.objects;
create policy "Authenticated can upload wine images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'wines');

drop policy if exists "Authenticated can update wine images" on storage.objects;
create policy "Authenticated can update wine images"
on storage.objects
for update
to authenticated
using (bucket_id = 'wines')
with check (bucket_id = 'wines');

drop policy if exists "Authenticated can delete wine images" on storage.objects;
create policy "Authenticated can delete wine images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'wines');
